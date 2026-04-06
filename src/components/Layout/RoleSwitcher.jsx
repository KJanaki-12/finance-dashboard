import React from 'react';
import { useAppContext } from '../../context/AppContext';

const RoleSwitcher = () => {
    const { role, setRole } = useAppContext();

    return (
        <div className="dropdown">
            <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-badge me-1"></i>
                <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
            </button>
            <ul className="dropdown-menu">
                <li>
                    <button className="dropdown-item" onClick={() => setRole('admin')}>
                        <i className="bi bi-shield-check me-2"></i>
                        Admin (Full Access)
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => setRole('viewer')}>
                        <i className="bi bi-eye me-2"></i>
                        Viewer (Read Only)
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default RoleSwitcher;