import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Layout/Header';
import SummaryCards from './components/Dashboard/SummaryCards';
import { BalanceTrendChart, SpendingBreakdownChart } from './components/Dashboard/Charts';
import Insights from './components/Dashboard/Insights';
import TransactionFilters from './components/Transactions/TransactionFilters';
import TransactionList from './components/Transactions/TransactionList';
import TransactionForm from './components/Transactions/TransactionForm';

const DashboardContent = () => {
    const { filteredTransactions, role, addTransaction, editTransaction } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleAddClick = () => {
        setEditingTransaction(null);
        setShowModal(true);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setShowModal(true);
    };

    const handleSave = (transactionData) => {
        if (editingTransaction) {
            editTransaction(editingTransaction.id, transactionData);
        } else {
            addTransaction(transactionData);
        }
        setShowModal(false);
        setEditingTransaction(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingTransaction(null);
    };

    return (
        <div className="container py-4 py-md-5 fade-in">
            <Header />
            
            {/* Role Alert */}
            <div className="alert alert-info alert-dismissible fade show mb-4" role="alert">
                <i className="bi bi-info-circle-fill me-2"></i>
                {role === 'admin' 
                    ? 'Admin mode: You can add, edit, and delete transactions.' 
                    : 'Viewer mode: Read-only access. You cannot modify transactions.'}
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            </div>
            
            <SummaryCards transactions={filteredTransactions} />
            
            <div className="row g-4 mb-4">
                <div className="col-lg-7">
                    <BalanceTrendChart transactions={filteredTransactions} />
                </div>
                <div className="col-lg-5">
                    <SpendingBreakdownChart transactions={filteredTransactions} />
                </div>
            </div>
            
            <Insights transactions={filteredTransactions} />
            
            <div className="card p-4">
                <TransactionFilters onAddClick={handleAddClick} />
                <TransactionList onEdit={handleEdit} />
            </div>
            
            {/* Modal */}
            {showModal && (
                <>
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <TransactionForm 
                                        transaction={editingTransaction}
                                        onSave={handleSave}
                                        onClose={handleCloseModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} onClick={handleCloseModal}></div>
                </>
            )}
        </div>
    );
};

function App() {
    return (
        <AppProvider>
            <DashboardContent />
        </AppProvider>
    );
}

export default App;