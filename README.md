# Finance Dashboard - React Application

A modern, feature-rich finance dashboard built with React.js and Bootstrap 5. Track your income, expenses, and spending patterns with interactive visualizations and real-time data management.

## 🚀 Live Demo

[View Live Demo](https://kjanaki-12.github.io/finance-dashboard/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Core Requirements](#core-requirements)
- [Optional Enhancements](#optional-enhancements)
- [Component Documentation](#component-documentation)
- [State Management](#state-management)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **Dashboard Overview**
  - Summary cards showing Total Balance, Income, and Expenses
  - Interactive balance trend chart (last 7 days)
  - Spending breakdown pie chart by category

- **Transaction Management**
  - Complete CRUD operations (Add, Edit, Delete)
  - Advanced filtering (by type, category, date range, amount)
  - Search functionality
  - Sorting capabilities
  - Pagination (5/10/25/50 items per page)
  - Transaction details modal view

- **Role-Based Access Control**
  - Admin mode: Full CRUD access
  - Viewer mode: Read-only access
  - Role persists in localStorage

- **Insights & Analytics**
  - Highest spending category
  - Monthly comparison
  - Smart spending insights

### Advanced Features
- 🌙 Dark mode with persistence
- 💾 Local storage data persistence
- 📊 Real-time chart updates
- 🏷️ Transaction tagging system
- 📍 Location tracking for transactions
- 💳 Multiple payment methods
- 📝 Notes and descriptions
- 🔄 CSV Export functionality
- 📱 Fully responsive design
- 🎨 Smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Bootstrap 5, Custom CSS
- **Charts**: Recharts
- **Icons**: React Icons, Bootstrap Icons
- **State Management**: React Context API + Custom Hooks
- **Storage**: LocalStorage
- **Build Tool**: Create React App

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Step-by-Step Setup

1. **Clone the repository**
```bash
git clone https://github.com/KJanaki-12/finance-dashboard.git
cd finance-dashboard-react