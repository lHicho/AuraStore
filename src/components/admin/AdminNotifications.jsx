import { FaBell, FaTriangleExclamation, FaCircleInfo } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';

export default function AdminNotifications() {
    const logs = [
        { id: 1, type: 'order', title: 'New Order #10482', description: 'Amina B. placed an order for $124.00', time: '5 mins ago', level: 'info' },
        { id: 2, type: 'stock', title: 'Low Stock Alert', description: '"Retro Shades" is down to 8 units.', time: '2 hours ago', level: 'warning' },
        { id: 3, type: 'user', title: 'New User Registered', description: 'Youssef M. joined the AuraStore community.', time: '4 hours ago', level: 'info' },
        { id: 4, type: 'payment', title: 'Failed Payment #10475', description: 'Stripe reported a declined card for Omar H.', time: '1 day ago', level: 'error' },
    ];

    const getIcon = (level) => {
        switch(level) {
            case 'warning': return <FaTriangleExclamation style={{ color: 'var(--warning)' }} />;
            case 'error': return <FaTriangleExclamation style={{ color: 'var(--error)' }} />;
            default: return <FaCircleInfo style={{ color: 'var(--primary)' }} />;
        }
    };

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>System Logs</h1>
                        <p>Track all activity within your store</p>
                    </div>
                </header>

                <section className="panel" style={{ margin: 'var(--space-2)' }}>
                    <div className="table-container">
                        <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id} style={{ background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--radius-lg)' }}>
                                        <td style={{ paddingLeft: 'var(--space-4)', width: '40px' }}>
                                            {getIcon(log.level)}
                                        </td>
                                        <td style={{ padding: 'var(--space-4)' }}>
                                            <div style={{ fontWeight: 700, fontSize: '14px' }}>{log.title}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{log.description}</div>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: 'var(--space-4)', color: 'var(--text-muted)', fontSize: '11px' }}>
                                            {log.time}
                                        </td>
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
