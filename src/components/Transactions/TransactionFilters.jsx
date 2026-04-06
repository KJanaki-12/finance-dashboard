import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { categories } from '../../utils/helpers';

const TransactionFilters = ({ onAddClick }) => {
    const { filters, setFilters, role } = useAppContext();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const handleTypeChange = (e) => {
        setFilters({ ...filters, type: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setFilters({ ...filters, category: e.target.value });
    };

    const handleDateRangeChange = (range) => {
        setFilters({ ...filters, dateRange: range });
    };

    const handleAmountRangeChange = (min, max) => {
        setFilters({ ...filters, amountMin: min, amountMax: max });
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            type: 'all',
            category: 'all',
            dateRange: 'all',
            amountMin: '',
            amountMax: '',
            sortBy: 'date_desc'
        });
    };

    const dateRanges = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7', label: 'Last 7 Days' },
        { value: 'last30', label: 'Last 30 Days' },
        { value: 'thisMonth', label: 'This Month' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'thisYear', label: 'This Year' }
    ];

    const quickFilters = [
        { icon: 'bi-cash-stack', label: 'All', type: 'all', category: 'all' },
        { icon: 'bi-arrow-up-circle', label: 'Income', type: 'income', category: 'all' },
        { icon: 'bi-arrow-down-circle', label: 'Expenses', type: 'expense', category: 'all' },
        { icon: 'bi-egg-fried', label: 'Food', type: 'all', category: 'Food' },
        { icon: 'bi-bus-front', label: 'Transport', type: 'all', category: 'Transport' },
        { icon: 'bi-tv', label: 'Entertainment', type: 'all', category: 'Entertainment' }
    ];

    return (
        <div>
            {/* Quick Filters */}
            <div className="mb-3">
                <div className="d-flex gap-2 flex-wrap">
                    {quickFilters.map((qf, index) => (
                        <button
                            key={index}
                            className={`btn btn-sm ${filters.type === qf.type && filters.category === qf.category ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                                setFilters({ ...filters, type: qf.type, category: qf.category });
                            }}
                        >
                            <i className={`${qf.icon} me-1`}></i>
                            {qf.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Filters */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                <h5 className="fw-semibold mb-0">
                    <i className="bi bi-receipt me-2"></i>
                    Transactions
                    <span className="badge bg-secondary ms-2">
                        {role === 'admin' ? 'Editable' : 'Read Only'}
                    </span>
                </h5>
                <div className="d-flex gap-2 flex-wrap">
                    <div className="input-group" style={{ width: '250px' }}>
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by description..."
                            value={filters?.search || ''}
                            onChange={handleSearchChange}
                        />
                    </div>
                    
                    <select
                        className="form-select"
                        style={{ width: '130px' }}
                        value={filters?.type || 'all'}
                        onChange={handleTypeChange}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    
                    <select
                        className="form-select"
                        style={{ width: '150px' }}
                        value={filters?.category || 'all'}
                        onChange={handleCategoryChange}
                    >
                        <option value="all">📁 All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <button 
                        className="btn btn-outline-info"
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        title="Advanced Filters"
                    >
                        <i className="bi bi-funnel"></i>
                        {showAdvancedFilters ? ' Hide' : ' Advanced'}
                    </button>

                    <button 
                        className="btn btn-outline-danger"
                        onClick={resetFilters}
                        title="Reset Filters"
                    >
                        <i className="bi bi-arrow-repeat"></i>
                    </button>

                    {role === 'admin' && (
                        <button className="btn btn-primary" onClick={onAddClick}>
                            <i className="bi bi-plus-lg"></i> Add Transaction
                        </button>
                    )}
                </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="card bg-light mb-3 fade-in">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <label className="form-label small fw-semibold">
                                    <i className="bi bi-calendar-range me-1"></i>
                                    Date Range
                                </label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters?.dateRange || 'all'}
                                    onChange={(e) => handleDateRangeChange(e.target.value)}
                                >
                                    {dateRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-2">
                                <label className="form-label small fw-semibold">
                                    <i className="bi bi-calculator me-1"></i>
                                    Amount Range
                                </label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="Min $"
                                        value={filters?.amountMin || ''}
                                        onChange={(e) => handleAmountRangeChange(e.target.value, filters?.amountMax)}
                                    />
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="Max $"
                                        value={filters?.amountMax || ''}
                                        onChange={(e) => handleAmountRangeChange(filters?.amountMin, e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <label className="form-label small fw-semibold">
                                    <i className="bi bi-sort-down me-1"></i>
                                    Sort By
                                </label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters?.sortBy || 'date_desc'}
                                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                >
                                    <option value="date_desc">Date (Newest First)</option>
                                    <option value="date_asc">Date (Oldest First)</option>
                                    <option value="amount_desc">Amount (Highest First)</option>
                                    <option value="amount_asc">Amount (Lowest First)</option>
                                    <option value="category_asc">Category (A-Z)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionFilters;