import { useNavigate, useLocation } from 'react-router-dom';
import { 
    FaChartPie, FaCartShopping, FaBox, FaUsers, 
    FaChartLine, FaGear, FaMagnifyingGlass, FaCalendarDay,
    FaShieldHalved, FaBell, FaTag
} from 'react-icons/fa6';
import { useUserStore } from '../../context/zustand.jsx';
import './AdminDashboard.css';
import profile from "../../assets/profile.png";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Overview', path: '/admin/dashboard', icon: <FaChartPie />, group: 'Main' },
        { label: 'Orders', path: '/admin/orders', icon: <FaCartShopping />, group: 'Main' },
        { label: 'Products', path: '/admin/products', icon: <FaBox />, group: 'Main' },
        { label: 'Inventory', path: '/admin/inventory', icon: <FaBox />, group: 'Main' },
        { label: 'Users', path: '/admin/users', icon: <FaUsers />, group: 'Main' },
        { label: 'Reviews', path: '/admin/reviews', icon: <FaShieldHalved />, group: 'Main' },
        { label: 'Coupons', path: '/admin/coupons', icon: <FaTag />, group: 'Reports' },
        { label: 'Analytics', path: '/admin/analytics', icon: <FaChartLine />, group: 'Reports' },
        { label: 'Notifications', path: '/admin/notifications', icon: <FaBell />, group: 'System' },
        { label: 'Settings', path: '/admin/settings', icon: <FaGear />, group: 'System' },
    ];

    const groups = ['Main', 'Reports', 'System'];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand" onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer' }}>
                <div className="brand-icon">A</div>
                <span className="brand-name">Aura<span>Admin</span></span>
            </div>

            <nav className="sidebar-nav">
                {groups.map(group => (
                    <div key={group} className="nav-group">
                        <span className="nav-label">{group}</span>
                        {navItems.filter(item => item.group === group).map(item => (
                            <button 
                                key={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => navigate(item.path)}
                                style={{ width: '100%', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-user">
                <div className="user-avatar">
                    <img src={profile} alt="Admin" />
                </div>
                <div className="user-meta">
                    <span className="user-name">{user?.name || 'Administrator'}</span>
                    <span className="user-role">Super Admin</span>
                </div>
                <button onClick={handleLogout} style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '10px', border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
            </div>
        </aside>
    );
}
