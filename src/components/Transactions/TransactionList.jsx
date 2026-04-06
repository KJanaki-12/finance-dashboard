import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import EmptyState from '../Common/EmptyState';

const TransactionList = ({ onEdit }) => {
    const { filteredTransactions, loading, role, deleteTransaction } = useAppContext();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <LoadingSpinner />;
    
    if (filteredTransactions.length === 0) {
        return <EmptyState message="No transactions found" />;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const getCategoryIcon = (category) => {
        const icons = {
            'Food': 'bi-egg-fried',
            'Transport': 'bi-bus-front',
            'Entertainment': 'bi-tv',
            'Shopping': 'bi-bag',
            'Salary': 'bi-cash-stack',
            'Freelance': 'bi-laptop',
            'Utilities': 'bi-lightbulb',
            'Healthcare': 'bi-heart-pulse',
            'Education': 'bi-book',
            'Investment': 'bi-graph-up',
            'Rent': 'bi-house',
            'Insurance': 'bi-shield-shaded'
        };
        return icons[category] || 'bi-tag';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Food': 'warning',
            'Transport': 'info',
            'Entertainment': 'danger',
            'Shopping': 'primary',
            'Salary': 'success',
            'Freelance': 'success',
            'Utilities': 'secondary',
            'Healthcare': 'danger',
            'Education': 'info',
            'Investment': 'success',
            'Rent': 'primary',
            'Insurance': 'secondary'
        };
        return colors[category] || 'secondary';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '15%' }}>Date</th>
                            <th style={{ width: '25%' }}>Description</th>
                            <th style={{ width: '15%' }}>Category</th>
                            <th style={{ width: '15%' }}>Amount</th>
                            <th style={{ width: '10%' }}>Type</th>
                            {role === 'admin' && <th style={{ width: '20%' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map(transaction => (
                            <tr key={transaction.id} className="transaction-row" style={{ cursor: 'pointer' }}>
                                <td onClick={() => handleViewDetails(transaction)}>
                                    <i className="bi bi-calendar3 me-1 text-muted"></i>
                                    {formatDate(transaction.date)}
                                </td>
                                <td onClick={() => handleViewDetails(transaction)}>
                                    <div className="d-flex flex-column">
                                        <strong>
                                            <i className="bi bi-pencil-square me-1 text-muted"></i>
                                            {transaction.description}
                                        </strong>
                                        {transaction.notes && (
                                            <small className="text-muted">
                                                <i className="bi bi-file-text me-1"></i>
                                                {transaction.notes.length > 50 ? transaction.notes.substring(0, 50) + '...' : transaction.notes}
                                            </small>
                                        )}
                                        {transaction.location && (
                                            <small className="text-muted">
                                                <i className="bi bi-geo-alt me-1"></i>
                                                {transaction.location}
                                            </small>
                                        )}
                                    </div>
                                </td>
                                <td onClick={() => handleViewDetails(transaction)}>
                                    <span className={`badge bg-${getCategoryColor(transaction.category)}`}>
                                        <i className={`${getCategoryIcon(transaction.category)} me-1`}></i>
                                        {transaction.category}
                                    </span>
                                </td>
                                <td onClick={() => handleViewDetails(transaction)} className={`fw-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                    <i className={`bi ${transaction.type === 'income' ? 'bi-arrow-up' : 'bi-arrow-down'} me-1`}></i>
                                    ${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td onClick={() => handleViewDetails(transaction)}>
                                    <span className={`badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
                                        <i className={`bi ${transaction.type === 'income' ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle'} me-1`}></i>
                                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                                    </span>
                                </td>
                                {role === 'admin' && (
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-info me-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetails(transaction);
                                            }}
                                            title="View Details"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-primary me-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(transaction);
                                            }}
                                            title="Edit"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm('Are you sure you want to delete this transaction?')) {
                                                    deleteTransaction(transaction.id);
                                                }
                                            }}
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-muted small">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
                    </div>
                    <nav>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                            </li>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                                            {pageNum}
                                        </button>
                                    </li>
                                );
                            })}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: 'auto' }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
            )}
        </>
    );
};

export default TransactionList;