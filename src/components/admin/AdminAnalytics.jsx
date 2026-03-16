import { FaCalendarDay, FaArrowUp, FaArrowDown, FaChartLine, FaPercent, FaCoins, FaCartArrowDown } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminAnalytics.css';

export default function AdminAnalytics() {
    const metrics = [
        { label: 'Monthly Revenue', value: '$48,230', trend: '+12.4%', up: true, icon: <FaCoins /> },
        { label: 'Conversion Rate', value: '3.8%', trend: '+0.4%', up: true, icon: <FaPercent /> },
        { label: 'Avg Order Value', value: '$118', trend: '$4 vs last month', up: false, icon: <FaChartLine /> },
        { label: 'Cart Abandonment', value: '61%', trend: '2% — investigate', up: false, warning: true, icon: <FaCartArrowDown /> },
    ];

    const categoryRevenue = [
        { name: 'Footwear', amount: '$18,400', percent: 85 },
        { name: 'Clothing', amount: '$12,800', percent: 65 },
        { name: 'Accessories', amount: '$9,200', percent: 45 },
        { name: 'Bags', amount: '$7,830', percent: 35 },
    ];

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Analytics</h1>
                        <p>Sales and performance metrics</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                <section className="analytics-container">
                    <div className="stats-grid">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="stat-card">
                                <div className="stat-header">
                                    <span className="stat-label">{metric.label}</span>
                                    <div className="stat-icon">{metric.icon}</div>
                                </div>
                                <div className="stat-value">{metric.value}</div>
                                <div className={`stat-trend ${metric.warning ? 'trend-warning' : (metric.up ? 'trend-up' : 'trend-down')}`}>
                                    {metric.up ? <FaArrowUp /> : <FaArrowDown />}
                                    {metric.trend}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="panel" style={{ marginTop: 'var(--space-8)' }}>
                        <div className="panel-header">
                            <span className="panel-title">Revenue by category</span>
                        </div>
                        <div className="category-stats">
                            {categoryRevenue.map((cat, idx) => (
                                <div key={idx} className="category-row">
                                    <div className="category-meta">
                                        <span>{cat.name}</span>
                                        <span>{cat.amount}</span>
                                    </div>
                                    <div className="category-bar-bg">
                                        <div 
                                            className="category-bar-fill" 
                                            style={{ width: `${cat.percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
