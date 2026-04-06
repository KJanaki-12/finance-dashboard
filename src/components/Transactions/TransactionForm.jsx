import React, { useState, useEffect } from 'react';
import { categories } from '../../utils/helpers';

const TransactionForm = ({ transaction, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Food',
        type: 'expense',
        amount: '',
        notes: '',
        location: '',
        paymentMethod: 'cash',
        tags: []
    });

    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});

    const paymentMethods = [
        { value: 'cash', label: 'Cash', icon: 'bi-cash' },
        { value: 'credit_card', label: 'Credit Card', icon: 'bi-credit-card' },
        { value: 'debit_card', label: 'Debit Card', icon: 'bi-credit-card-2-front' },
        { value: 'bank_transfer', label: 'Bank Transfer', icon: 'bi-bank' },
        { value: 'paypal', label: 'PayPal', icon: 'bi-paypal' },
        { value: 'crypto', label: 'Cryptocurrency', icon: 'bi-currency-bitcoin' }
    ];

    useEffect(() => {
        if (transaction) {
            setFormData({
                date: transaction.date,
                description: transaction.description,
                category: transaction.category,
                type: transaction.type,
                amount: transaction.amount,
                notes: transaction.notes || '',
                location: transaction.location || '',
                paymentMethod: transaction.paymentMethod || 'cash',
                tags: transaction.tags || []
            });
        }
    }, [transaction]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = 'Valid amount is required';
        }
        if (formData.amount > 1000000) {
            newErrors.amount = 'Amount cannot exceed $1,000,000';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleAmountChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value)) value = '';
        setFormData({ ...formData, amount: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                {/* Date */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-calendar3 me-1 text-primary"></i>
                        Date *
                    </label>
                    <input
                        type="date"
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>

                {/* Type */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-arrow-left-right me-1 text-primary"></i>
                        Transaction Type *
                    </label>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="typeExpense"
                                value="expense"
                                checked={formData.type === 'expense'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            />
                            <label className="form-check-label text-danger" htmlFor="typeExpense">
                                <i className="bi bi-arrow-down-circle me-1"></i>
                                Expense
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="typeIncome"
                                value="income"
                                checked={formData.type === 'income'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            />
                            <label className="form-check-label text-success" htmlFor="typeIncome">
                                <i className="bi bi-arrow-up-circle me-1"></i>
                                Income
                            </label>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-pencil-square me-1 text-primary"></i>
                        Description *
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="e.g., Grocery shopping at Walmart"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {/* Category & Amount */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-folder me-1 text-primary"></i>
                        Category *
                    </label>
                    <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <optgroup label="Expense Categories">
                            <option value="Food">Food & Dining</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Rent">Rent/Mortgage</option>
                            <option value="Insurance">Insurance</option>
                        </optgroup>
                        <optgroup label="Income Categories">
                            <option value="Salary">Salary</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Investment">Investment</option>
                            <option value="Gift">Gift</option>
                        </optgroup>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-calculator me-1 text-primary"></i>
                        Amount ($) *
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            max="1000000"
                            value={formData.amount}
                            onChange={handleAmountChange}
                            required
                        />
                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-credit-card me-1 text-primary"></i>
                        Payment Method
                    </label>
                    <select
                        className="form-select"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                        {paymentMethods.map(method => (
                            <option key={method.value} value={method.value}>
                                <i className={`${method.icon} me-2`}></i>
                                {method.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location */}
                <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-geo-alt me-1 text-primary"></i>
                        Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., New York, USA"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>

                {/* Notes */}
                <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-file-text me-1 text-primary"></i>
                        Notes
                    </label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Additional notes about this transaction..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                </div>

                {/* Tags */}
                <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">
                        <i className="bi bi-tags me-1 text-primary"></i>
                        Tags
                    </label>
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add tags (e.g., urgent, work, personal)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button type="button" className="btn btn-outline-primary" onClick={handleAddTag}>
                            <i className="bi bi-plus-lg"></i> Add
                        </button>
                    </div>
                    {formData.tags.length > 0 && (
                        <div className="d-flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                                <span key={tag} className="badge bg-primary p-2">
                                    <i className="bi bi-tag me-1"></i>
                                    {tag}
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white ms-2"
                                        style={{ fontSize: '0.6rem' }}
                                        onClick={() => handleRemoveTag(tag)}
                                        aria-label="Remove"
                                    ></button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="modal-footer px-0 pb-0">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    <i className="bi bi-x-circle me-1"></i>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-1"></i>
                    {transaction ? 'Update Transaction' : 'Save Transaction'}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;