import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockTransactions, getFilteredTransactions } from '../utils/helpers';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useLocalStorage('transactions', mockTransactions);
    const [role, setRole] = useLocalStorage('role', 'admin');
    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        category: 'all',
        dateRange: 'all',
        amountMin: '',
        amountMax: '',
        sortBy: 'date_desc'
    });
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

    // Apply dark mode to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Simulate API loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [transactions]);

    const addTransaction = (transaction) => {
        if (role !== 'admin') return;
        const newTransaction = {
            ...transaction,
            id: Date.now().toString(),
            date: transaction.date || new Date().toISOString().split('T')[0]
        };
        setTransactions([newTransaction, ...transactions]);
    };

    const editTransaction = (id, updatedTransaction) => {
        if (role !== 'admin') return;
        setTransactions(transactions.map(t => 
            t.id === id ? { ...t, ...updatedTransaction } : t
        ));
    };

    const deleteTransaction = (id) => {
        if (role !== 'admin') return;
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setTransactions(transactions.filter(t => t.id !== id));
        }
    };

    // Safely get filtered transactions with error handling
    const filteredTransactions = useMemo(() => {
        try {
            return getFilteredTransactions(transactions, filters);
        } catch (error) {
            console.error('Error filtering transactions:', error);
            return transactions;
        }
    }, [transactions, filters]);

    const value = {
        transactions,
        filteredTransactions,
        role,
        setRole,
        filters,
        setFilters,
        loading,
        darkMode,
        setDarkMode,
        addTransaction,
        editTransaction,
        deleteTransaction
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};