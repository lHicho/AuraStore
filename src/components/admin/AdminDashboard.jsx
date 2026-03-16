import { useNavigate } from 'react-router-dom';
import { 
    FaChartLine, FaBox, FaUsers, FaCartShopping, 
    FaArrowUp, FaArrowDown, FaCalendarDay
} from 'react-icons/fa6';
import './AdminDashboard.css';
import AdminSidebar from './AdminSidebar';

export default function AdminDashboard() {
    const navigate = useNavigate();

    // Mock data for the dashboard
    const stats = [
        { id: 1, label: 'Total Revenue', value: '$48,230', trend: '+12.4%', up: true, icon: <FaChartLine /> },
        { id: 2, label: 'Orders Today', value: '134', trend: '+8 from yesterday', up: true, icon: <FaCartShopping /> },
        { id: 3, label: 'Active Users', value: '2,841', trend: '+3.1% this week', up: true, icon: <FaUsers /> },
        { id: 4, label: 'Pending Orders', value: '27', trend: '5 need action', up: false, warning: true, icon: <FaBox /> },
    ];

    const revenueData = [
        { day: 'Mon', value: 40 },
        { day: 'Tue', value: 65 },
        { day: 'Wed', value: 35 },
        { day: 'Thu', value: 85 },
        { day: 'Fri', value: 100, active: true },
        { day: 'Sat', value: 75 },
        { day: 'Sun', value: 55 },
    ];

    const topProducts = [
        { name: 'Air Max 90', price: '$8,420', progress: 85 },
        { name: 'Canvas Tote', price: '$5,180', progress: 60 },
        { name: 'Retro Shades', price: '$3,750', progress: 45 },
    ];

    const recentOrders = [
        { id: '#10482', customer: 'Amina B.', items: '2 items', total: '$124.00', status: 'Delivered', date: 'Mar 14' },
        { id: '#10481', customer: 'Youssef M.', items: '1 item', total: '$89.00', status: 'Shipped', date: 'Mar 14' },
        { id: '#10480', customer: 'Sara K.', items: '3 items', total: '$231.50', status: 'Pending', date: 'Mar 15' },
    ];

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Overview</h1>
                        <p>Sunday, March 15 · All stores</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="stats-grid">
                    {stats.map(stat => (
                        <div key={stat.id} className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">{stat.label}</span>
                                <div className="stat-icon">{stat.icon}</div>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className={`stat-trend ${stat.warning ? 'trend-warning' : (stat.up ? 'trend-up' : 'trend-down')}`}>
                                {stat.up ? <FaArrowUp /> : <FaArrowDown />}
                                {stat.trend}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Middle Grid: Chart and Products */}
                <section className="middle-grid">
                    <div className="panel revenue-panel">
                        <div className="panel-header">
                            <span className="panel-title">Revenue — last 7 days</span>
                            <a href="#" className="panel-link">View analytics</a>
                        </div>
                        <div className="revenue-bars">
                            {revenueData.map((item, idx) => (
                                <div key={idx} className="bar-wrapper">
                                    <div 
                                        className={`bar ${item.active ? 'active' : ''}`} 
                                        style={{ height: `${item.value}%` }}
                                    ></div>
                                    <span className="bar-label">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="panel products-panel">
                        <div className="panel-header">
                            <span className="panel-title">Top products</span>
                            <a href="#" className="panel-link">All products</a>
                        </div>
                        <div className="product-list">
                            {topProducts.map((product, idx) => (
                                <div key={idx} className="product-item">
                                    <div className="product-img"></div>
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                        <div className="product-progress">
                                            <div className="progress-fill" style={{ width: `${product.progress}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="product-price">{product.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Orders Table */}
                <section className="panel orders-panel">
                    <div className="panel-header">
                        <span className="panel-title">Recent orders</span>
                        <a href="#" className="panel-link">View all orders</a>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td className="order-id">{order.id}</td>
                                        <td className="customer-cell">{order.customer}</td>
                                        <td>{order.items}</td>
                                        <td style={{ fontWeight: 600 }}>{order.total}</td>
                                        <td>
                                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
