import { useState } from 'react';
import { FaLock, FaArrowRight, FaUserShield, FaHouse } from 'react-icons/fa6';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../context/zustand.jsx';

export default function AdminLogin() {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [formData, setFormData] = useState({
        adminEmail: '',
        adminPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setUser({ 
                name: 'Administrator', 
                email: formData.adminEmail, 
                role: 'admin' 
            });
            setLoading(false);
            navigate('/admin/dashboard');
        }, 1200);
    };

    return (
        <section className="admin-login-section">
            <div className="admin-login-container">
                <div className="admin-card">
                    <div className="admin-header">
                        <span className="admin-badge">Secure Access</span>
                        <h1>Aura Console</h1>
                        <p>Management & System Control</p>
                    </div>

                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="admin-input-group">
                            <label><FaUserShield /> Admin Email</label>
                            <div className="admin-input-wrapper">
                                <input
                                    type="email"
                                    name="adminEmail"
                                    placeholder="admin@aurastore.com"
                                    value={formData.adminEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label><FaLock /> Access Key</label>
                            <div className="admin-input-wrapper">
                                <input
                                    type="password"
                                    name="adminPassword"
                                    placeholder="••••••••"
                                    value={formData.adminPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="admin-submit-btn" disabled={loading}>
                            {loading ? (
                                <span>Processing...</span>
                            ) : (
                                <>
                                    <span>Enter Console</span>
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="admin-footer">
                        <button className="back-home-btn" onClick={() => navigate('/')}>
                            <FaHouse />
                            Back to Storefront
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
