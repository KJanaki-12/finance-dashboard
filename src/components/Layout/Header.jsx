import React from 'react';
import { useAppContext } from '../../context/AppContext';
import RoleSwitcher from './RoleSwitcher';

const Header = () => {
    const { darkMode, setDarkMode } = useAppContext();

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <div>
                <h1 className="display-6 fw-bold mb-1">
                    <i className="bi bi-graph-up-arrow text-primary me-2"></i>
                    Finance Dashboard
                </h1>
                <p className="text-muted">Track your income, expenses, and spending patterns</p>
            </div>
            <div className="d-flex gap-3">
                <RoleSwitcher />
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <i className={`bi bi-${darkMode ? 'sun' : 'moon-stars'}`}></i>
                </button>
            </div>
        </div>
    );
};

export default Header;