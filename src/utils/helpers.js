// Mock data with rich details
export const mockTransactions = [
    { 
        id: '1', 
        date: '2026-03-15', 
        description: 'Monthly salary', 
        category: 'Salary', 
        type: 'income', 
        amount: 3200,
        notes: 'March 2026 salary from Tech Corp',
        location: 'San Francisco, CA',
        paymentMethod: 'bank_transfer',
        tags: ['work', 'monthly']
    },
    { 
        id: '2', 
        date: '2026-03-14', 
        description: 'Grocery shopping', 
        category: 'Food', 
        type: 'expense', 
        amount: 85.50,
        notes: 'Weekly groceries from Whole Foods',
        location: 'Boston, MA',
        paymentMethod: 'credit_card',
        tags: ['groceries', 'essentials']
    },
    { 
        id: '3', 
        date: '2026-03-12', 
        description: 'Uber rides', 
        category: 'Transport', 
        type: 'expense', 
        amount: 45,
        notes: 'Airport pickup and dropoff',
        location: 'JFK Airport, NY',
        paymentMethod: 'credit_card',
        tags: ['travel', 'transportation']
    },
    { 
        id: '4', 
        date: '2026-03-10', 
        description: 'Netflix & Spotify', 
        category: 'Entertainment', 
        type: 'expense', 
        amount: 120,
        notes: 'Monthly subscription renewals',
        location: 'Online',
        paymentMethod: 'credit_card',
        tags: ['subscriptions', 'entertainment']
    },
    { 
        id: '5', 
        date: '2026-03-08', 
        description: 'New shoes', 
        category: 'Shopping', 
        type: 'expense', 
        amount: 200,
        notes: 'Running shoes from Nike Store',
        location: 'Mall of America',
        paymentMethod: 'debit_card',
        tags: ['shopping', 'fitness']
    },
    { 
        id: '6', 
        date: '2026-03-05', 
        description: 'Freelance project', 
        category: 'Freelance', 
        type: 'income', 
        amount: 500,
        notes: 'Website development for client ABC',
        location: 'Remote',
        paymentMethod: 'paypal',
        tags: ['freelance', 'extra income']
    },
    { 
        id: '7', 
        date: '2026-02-28', 
        description: 'Restaurant dinner', 
        category: 'Food', 
        type: 'expense', 
        amount: 90,
        notes: 'Birthday dinner with friends',
        location: 'Italian Restaurant, Chicago',
        paymentMethod: 'credit_card',
        tags: ['dining', 'social']
    },
    { 
        id: '8', 
        date: '2026-02-25', 
        description: 'Electricity bill', 
        category: 'Utilities', 
        type: 'expense', 
        amount: 60,
        notes: 'February utility bill',
        location: 'Home',
        paymentMethod: 'bank_transfer',
        tags: ['bills', 'utilities']
    },
    { 
        id: '9', 
        date: '2026-03-18', 
        description: 'Coffee shop', 
        category: 'Food', 
        type: 'expense', 
        amount: 12,
        notes: 'Morning coffee and pastry',
        location: 'Starbucks',
        paymentMethod: 'cash',
        tags: ['coffee', 'daily']
    },
    { 
        id: '10', 
        date: '2026-03-17', 
        description: 'Bonus', 
        category: 'Salary', 
        type: 'income', 
        amount: 500,
        notes: 'Performance bonus Q1 2026',
        location: 'Company',
        paymentMethod: 'bank_transfer',
        tags: ['bonus', 'extra income']
    },
    { 
        id: '11', 
        date: '2026-03-16', 
        description: 'Gym membership', 
        category: 'Health', 
        type: 'expense', 
        amount: 50,
        notes: 'Monthly gym subscription',
        location: 'Fitness Center',
        paymentMethod: 'credit_card',
        tags: ['health', 'fitness']
    },
    { 
        id: '12', 
        date: '2026-03-13', 
        description: 'Online course', 
        category: 'Education', 
        type: 'expense', 
        amount: 150,
        notes: 'React.js advanced course',
        location: 'Udemy',
        paymentMethod: 'paypal',
        tags: ['education', 'learning']
    },
    { 
        id: '13', 
        date: '2026-03-09', 
        description: 'Stock dividends', 
        category: 'Investment', 
        type: 'income', 
        amount: 75,
        notes: 'Quarterly dividend payment',
        location: 'Investment Account',
        paymentMethod: 'bank_transfer',
        tags: ['investing', 'passive income']
    },
    { 
        id: '14', 
        date: '2026-03-07', 
        description: 'Movie tickets', 
        category: 'Entertainment', 
        type: 'expense', 
        amount: 35,
        notes: 'IMAX movie with friends',
        location: 'AMC Theater',
        paymentMethod: 'debit_card',
        tags: ['movies', 'social']
    },
    { 
        id: '15', 
        date: '2026-03-04', 
        description: 'Gas station', 
        category: 'Transport', 
        type: 'expense', 
        amount: 55,
        notes: 'Full tank of gas',
        location: 'Shell Gas Station',
        paymentMethod: 'credit_card',
        tags: ['fuel', 'essential']
    }
];

// Categories list
export const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Salary', 'Freelance', 'Utilities', 'Health', 'Education', 'Investment'];

// Get filtered transactions based on filters
export const getFilteredTransactions = (transactions, filters) => {
    if (!transactions || !Array.isArray(transactions)) return [];
    
    let filtered = [...transactions];
    
    // Search filter
    if (filters?.search && filters.search !== '') {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(t => 
            t.description.toLowerCase().includes(searchLower) ||
            (t.notes && t.notes.toLowerCase().includes(searchLower)) ||
            (t.location && t.location.toLowerCase().includes(searchLower))
        );
    }
    
    // Type filter
    if (filters?.type && filters.type !== 'all') {
        filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Category filter
    if (filters?.category && filters.category !== 'all') {
        filtered = filtered.filter(t => t.category === filters.category);
    }
    
    // Date range filter
    if (filters?.dateRange && filters.dateRange !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch(filters.dateRange) {
            case 'today':
                filtered = filtered.filter(t => t.date === today.toISOString().split('T')[0]);
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                filtered = filtered.filter(t => t.date === yesterday.toISOString().split('T')[0]);
                break;
            case 'last7':
                const last7 = new Date(today);
                last7.setDate(last7.getDate() - 7);
                filtered = filtered.filter(t => new Date(t.date) >= last7);
                break;
            case 'last30':
                const last30 = new Date(today);
                last30.setDate(last30.getDate() - 30);
                filtered = filtered.filter(t => new Date(t.date) >= last30);
                break;
            case 'thisMonth':
                filtered = filtered.filter(t => {
                    const date = new Date(t.date);
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                });
                break;
        }
    }
    
    // Amount range filter
    if (filters?.amountMin && filters.amountMin !== '') {
        filtered = filtered.filter(t => t.amount >= parseFloat(filters.amountMin));
    }
    if (filters?.amountMax && filters.amountMax !== '') {
        filtered = filtered.filter(t => t.amount <= parseFloat(filters.amountMax));
    }
    
    // Sorting
    if (filters?.sortBy) {
        switch(filters.sortBy) {
            case 'date_desc':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date_asc':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'amount_desc':
                filtered.sort((a, b) => b.amount - a.amount);
                break;
            case 'amount_asc':
                filtered.sort((a, b) => a.amount - b.amount);
                break;
            case 'category_asc':
                filtered.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }
    }
    
    return filtered;
};

// Calculate summary statistics
export const calculateSummary = (transactions) => {
    if (!transactions || !Array.isArray(transactions)) {
        return { totalIncome: 0, totalExpenses: 0, totalBalance: 0 };
    }
    
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalBalance = totalIncome - totalExpenses;
    
    return { totalIncome, totalExpenses, totalBalance };
};

// Get balance trend for last 7 days
export const getBalanceTrend = (transactions) => {
    if (!transactions || !Array.isArray(transactions)) {
        return [];
    }
    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split('T')[0]);
    }
    
    let runningBalance = 0;
    const trendData = [];
    
    for (const date of last7Days) {
        const dayTransactions = transactions.filter(t => t.date === date);
        const dayChange = dayTransactions.reduce((sum, t) => 
            t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
        runningBalance += dayChange;
        trendData.push({ date: date.slice(5), balance: runningBalance });
    }
    
    return trendData;
};

// Get spending breakdown by category
export const getSpendingBreakdown = (transactions) => {
    if (!transactions || !Array.isArray(transactions)) {
        return [];
    }
    
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = {};
    
    expenses.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });
    
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
};