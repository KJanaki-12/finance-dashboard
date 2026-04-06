import React from 'react';
import { calculateSummary } from '../../utils/helpers';

const SummaryCards = ({ transactions }) => {
    const { totalBalance, totalIncome, totalExpenses } = calculateSummary(transactions);

    const cards = [
        { title: 'Total Balance', value: totalBalance, icon: 'bi-wallet2', color: 'primary', bg: 'primary' },
        { title: 'Total Income', value: totalIncome, icon: 'bi-arrow-up-circle', color: 'success', bg: 'success' },
        { title: 'Total Expenses', value: totalExpenses, icon: 'bi-arrow-down-circle', color: 'danger', bg: 'danger' }
    ];

    return (
        <div className="row g-4 mb-4">
            {cards.map((card, index) => (
                <div className="col-md-4" key={index}>
                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <small className="text-muted">{card.title}</small>
                                <h2 className={`fw-bold mb-0 text-${card.color}`}>
                                    ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h2>
                            </div>
                            <div className={`stat-icon bg-${card.bg} bg-opacity-10 text-${card.color}`}>
                                <i className={card.icon}></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;