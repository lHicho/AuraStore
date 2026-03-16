import { useState } from 'react';
import { 
    FaCalendarDay, FaShop, FaCreditCard, FaTruck, 
    FaBell, FaPalette, FaShieldHalved, FaFloppyDisk,
    FaStripe, FaPaypal, FaBitcoin
} from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminSettings.css';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Store Profile', icon: <FaShop /> },
        { id: 'payments', label: 'Payment Methods', icon: <FaCreditCard /> },
        { id: 'shipping', label: 'Shipping & Delivery', icon: <FaTruck /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'appearance', label: 'Aura Customization', icon: <FaPalette /> },
        { id: 'security', label: 'API & Security', icon: <FaShieldHalved /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>Store Profile</h2>
                            <p>Manage your storefront information and public contact details.</p>
                        </div>
                        <div className="settings-form-grid">
                            <div className="input-group">
                                <label>Store Name</label>
                                <input type="text" defaultValue="AuraStore Premium" />
                            </div>
                            <div className="input-group">
                                <label>Business Email</label>
                                <input type="email" defaultValue="hello@aurastore.com" />
                            </div>
                            <div className="input-group">
                                <label>Contact Phone</label>
                                <input type="text" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <div className="input-group">
                                <label>Store Currency</label>
                                <select defaultValue="USD">
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label>Business Address</label>
                                <textarea rows="3" defaultValue="123 Tech Avenue, Glass Valley, CA 94043"></textarea>
                            </div>
                        </div>
                    </div>
                );
            case 'payments':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>Payment Gateways</h2>
                            <p>Configure how you receive payments from customers.</p>
                        </div>
                        <div className="gateway-list">
                            <div className="gateway-item">
                                <div className="gateway-icon"><FaStripe style={{ color: '#635bff' }} /></div>
                                <div style={{ flex: 1 }}>
                                    <h4>Stripe Payments</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Accept credit cards and local payment methods.</p>
                                </div>
                                <div className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </div>
                            </div>
                            <div className="gateway-item">
                                <div className="gateway-icon"><FaPaypal style={{ color: '#003087' }} /></div>
                                <div style={{ flex: 1 }}>
                                    <h4>PayPal Checkout</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Let customers pay via PayPal balance or cards.</p>
                                </div>
                                <div className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </div>
                            </div>
                            <div className="gateway-item">
                                <div className="gateway-icon"><FaBitcoin style={{ color: '#f7931a' }} /></div>
                                <div style={{ flex: 1 }}>
                                    <h4>Crypto Gateway</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Accept BTC, ETH, and USDC via AuraPay.</p>
                                </div>
                                <div className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'shipping':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>Shipping Options</h2>
                            <p>Define shipping zones and delivery rates for your products.</p>
                        </div>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>Free Shipping over $100</h4>
                                <p>Automatically apply free shipping for high-value orders.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>International Shipping</h4>
                                <p>Enable delivery to countries outside your primary region.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="input-group" style={{ marginTop: 'var(--space-4)' }}>
                            <label>Default Flat Rate ($)</label>
                            <input type="number" defaultValue="9.99" />
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>Notification Preferences</h2>
                            <p>Decide when you and your customers get notified.</p>
                        </div>
                        <h4 style={{ marginBottom: 'var(--space-4)', fontSize: '14px' }}>Admin Alerts</h4>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>New Order Emails</h4>
                                <p>Get notified immediately when a sale is made.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>Low Stock Alerts</h4>
                                <p>Receive warnings when inventory falls below 10 units.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <h4 style={{ margin: 'var(--space-6) 0 var(--space-4)', fontSize: '14px' }}>Customer Emails</h4>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>Order Confirmations</h4>
                                <p>Send receipt and summary after purchase.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>Aura Customization</h2>
                            <p>Personalize the dashboard and storefront branding.</p>
                        </div>
                        <div className="settings-form-grid">
                            <div className="input-group">
                                <label>Brand Primary Color</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="color" defaultValue="#ff5500" style={{ width: '50px', padding: '2px' }} />
                                    <input type="text" defaultValue="#ff5500" style={{ flex: 1 }} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Interface Mode</label>
                                <select defaultValue="system">
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                    <option value="system">Follow System</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Font Family</label>
                                <select defaultValue="Fredoka">
                                    <option value="Fredoka">Fredoka (Modern)</option>
                                    <option value="Inter">Inter (Professional)</option>
                                    <option value="Outfit">Outfit (Clean)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Glass Intensity</label>
                                <input type="range" min="0" max="100" defaultValue="70" />
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="settings-section-card">
                        <div className="settings-section-header">
                            <h2>API & Security</h2>
                            <p>Manage your secret keys and site-wide security settings.</p>
                        </div>
                        <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                            <label>Live API Key</label>
                            <input type="password" defaultValue="aura_live_51Mkh6I2e3d4f5g6h7i8j9k0l" />
                        </div>
                        <div className="toggle-group">
                            <div className="toggle-info">
                                <h4>Maintenance Mode</h4>
                                <p>Hide the storefront while performing updates.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="toggle-group" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <div className="toggle-info">
                                <h4 style={{ color: 'var(--error)' }}>Production Debugging</h4>
                                <p>Enable detailed logging (Warning: reduces performance).</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Settings</h1>
                        <p>Configure your AuraStore ecosystem</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                <section className="settings-container">
                    <aside className="settings-tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id}
                                className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </aside>

                    <div className="settings-content-panel">
                        {renderContent()}
                        <button className="save-settings-btn">
                            <FaFloppyDisk style={{ marginRight: '8px' }} />
                            Save Changes
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
