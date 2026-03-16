import { useState } from 'react';
import { FaMagnifyingGlass, FaCalendarDay } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminOrders.css';

export default function AdminOrders() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const orders = [
        { id: '#10482', customer: 'Amina B.', items: 2, total: '$124.00', status: 'Delivered', date: 'Mar 14' },
        { id: '#10481', customer: 'Youssef M.', items: 1, total: '$89.00', status: 'Shipped', date: 'Mar 14' },
        { id: '#10480', customer: 'Sara K.', items: 3, total: '$231.50', status: 'Pending', date: 'Mar 15' },
        { id: '#10479', customer: 'Omar H.', items: 1, total: '$55.00', status: 'Cancelled', date: 'Mar 13' },
        { id: '#10478', customer: 'Nour A.', items: 4, total: '$310.00', status: 'Delivered', date: 'Mar 12' },
        { id: '#10477', customer: 'Karim L.', items: 2, total: '$178.00', status: 'Shipped', date: 'Mar 12' },
        { id: '#10476', customer: 'Fatima Z.', items: 1, total: '$42.00', status: 'Pending', date: 'Mar 15' },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' || order.status === filter;
        const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase()) || order.id.includes(search);
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Orders</h1>
                        <p>Manage and update order statuses</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                <section className="orders-container">
                    <div className="orders-filters-bar">
                        <div className="search-orders-wrapper">
                            <FaMagnifyingGlass />
                            <input 
                                type="text" 
                                placeholder="Search orders by ID or customer..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="filter-chips">
                            {['All', 'Pending', 'Shipped', 'Delivered'].map(f => (
                                <button 
                                    key={f} 
                                    className={`filter-chip ${filter === f ? 'active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="panel orders-table-panel">
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, idx) => (
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
                                            <td>
                                                <button className="view-btn">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredOrders.length === 0 && (
                                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No orders found matching your criteria.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
