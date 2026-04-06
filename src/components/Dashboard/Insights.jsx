import React from 'react';

const Insights = ({ transactions }) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Calculate highest spending category
    const categorySpending = {};
    expenses.forEach(e => {
        categorySpending[e.category] = (categorySpending[e.category] || 0) + e.amount;
    });
    
    let highestCategory = 'None';
    let highestAmount = 0;
    for (const [cat, amt] of Object.entries(categorySpending)) {
        if (amt > highestAmount) {
            highestAmount = amt;
            highestCategory = cat;
        }
    }
    
    // Monthly comparison
    const marchExpenses = expenses.filter(e => e.date.startsWith('2026-03')).reduce((sum, e) => sum + e.amount, 0);
    const febExpenses = expenses.filter(e => e.date.startsWith('2026-02')).reduce((sum, e) => sum + e.amount, 0);
    const comparison = febExpenses === 0 ? 'No February data' : 
        marchExpenses > febExpenses ? `↑ March +$${(marchExpenses - febExpenses).toFixed(2)}` : 
        `↓ March -$${(febExpenses - marchExpenses).toFixed(2)}`;
    
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const percentage = totalExpenses > 0 ? ((highestAmount / totalExpenses) * 100).toFixed(0) : 0;

    const insights = [
        {
            icon: 'bi-graph-up',
            title: 'Highest Spending Category',
            value: `${highestCategory}`,
            subtitle: `$${highestAmount.toFixed(2)} total`
        },
        {
            icon: 'bi-calendar-week',
            title: 'Monthly Comparison',
            value: comparison,
            subtitle: 'Feb vs Mar 2026'
        },
        {
            icon: 'bi-lightbulb',
            title: 'Top Spending Insight',
            value: `${highestCategory} is ${percentage}% of expenses`,
            subtitle: 'Consider budgeting this category'
        }
    ];

    return (
        <div className="card p-4 mb-4">
            <h5 className="fw-semibold mb-3">
                <i className="bi bi-lightbulb me-2 text-warning"></i>
                Insights & Analytics
            </h5>
            <div className="row">
                {insights.map((insight, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="p-3 bg-light rounded h-100">
                            <i className={`${insight.icon} fs-4 text-primary mb-2 d-block`}></i>
                            <small className="text-muted">{insight.title}</small>
                            <p className="fw-bold mb-1">{insight.value}</p>
                            <small className="text-muted">{insight.subtitle}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Insights;