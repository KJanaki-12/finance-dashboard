import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getBalanceTrend, getSpendingBreakdown } from '../../utils/helpers';

const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14', '#20c997'];

export const BalanceTrendChart = ({ transactions }) => {
    const data = getBalanceTrend(transactions);
    
    if (!data || data.length === 0) {
        return (
            <div className="card p-3">
                <h5 className="fw-semibold mb-3">
                    <i className="bi bi-graph-up me-2"></i>
                    Balance Trend (Last 7 Days)
                </h5>
                <div className="text-center py-5">
                    <i className="bi bi-graph-up fs-1 text-muted"></i>
                    <p className="text-muted mt-2">No data available for chart</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-3">
            <h5 className="fw-semibold mb-3">
                <i className="bi bi-graph-up me-2"></i>
                Balance Trend (Last 7 Days)
            </h5>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#0d6efd" strokeWidth={2} dot={{ fill: '#0d6efd' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const SpendingBreakdownChart = ({ transactions }) => {
    const data = getSpendingBreakdown(transactions);

    if (!data || data.length === 0) {
        return (
            <div className="card p-3">
                <h5 className="fw-semibold mb-3">
                    <i className="bi bi-pie-chart me-2"></i>
                    Spending Breakdown
                </h5>
                <div className="text-center py-5">
                    <i className="bi bi-pie-chart fs-1 text-muted"></i>
                    <p className="text-muted mt-2">No expense data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-3">
            <h5 className="fw-semibold mb-3">
                <i className="bi bi-pie-chart me-2"></i>
                Spending Breakdown
            </h5>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};