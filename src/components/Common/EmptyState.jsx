import React from 'react';

const EmptyState = ({ message = "No data available" }) => (
    <div className="empty-state">
        <i className="bi bi-inbox fs-1 text-muted"></i>
        <p className="text-muted mt-2">{message}</p>
    </div>
);

export default EmptyState;