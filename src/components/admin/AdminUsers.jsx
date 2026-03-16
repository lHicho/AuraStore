import { useState } from 'react';
import { FaMagnifyingGlass, FaCalendarDay } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminOrders.css'; // Reusing some filter styles
import './AdminUsers.css';

export default function AdminUsers() {
    const [filter, setFilter] = useState('All users');
    const [search, setSearch] = useState('');

    const users = [
        { name: 'Amina B.', email: 'amina@example.com', joined: 'Jan 2025', orders: 14, spent: '$1,240' },
        { name: 'Youssef M.', email: 'youssef@example.com', joined: 'Mar 2025', orders: 6, spent: '$480', isNew: true },
        { name: 'Sara K.', email: 'sara@example.com', joined: 'Feb 2026', orders: 2, spent: '$310' },
        { name: 'Omar H.', email: 'omar@example.com', joined: 'Nov 2024', orders: 9, spent: '$720' },
        { name: 'Nour A.', email: 'nour@example.com', joined: 'Sep 2024', orders: 21, spent: '$3,100' },
    ];

    const filteredUsers = users.filter(u => {
        const matchesFilter = filter === 'All users' || (filter === 'New this month' && u.isNew);
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Users</h1>
                        <p>View and manage customers</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                <section className="users-container">
                    <div className="orders-filters-bar">
                        <div className="search-orders-wrapper">
                            <FaMagnifyingGlass />
                            <input 
                                type="text" 
                                placeholder="Search users..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="filter-chips">
                            {['All users', 'New this month'].map(f => (
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Joined</th>
                                        <th>Orders</th>
                                        <th>Total spent</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: 600 }}>
                                                {user.name}
                                                {user.isNew && <span className="new-user-badge">New</span>}
                                            </td>
                                            <td style={{ color: 'var(--text-muted)' }}>{user.email}</td>
                                            <td>{user.joined}</td>
                                            <td>{user.orders}</td>
                                            <td style={{ fontWeight: 600 }}>{user.spent}</td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="view-btn">View</button>
                                                    <button className="ban-btn">Ban</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
