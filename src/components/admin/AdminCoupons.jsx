import { useState } from 'react';
import { FaTag, FaPlus, FaCalendarDay, FaTrash } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminCoupons.css';

export default function AdminCoupons() {
    const coupons = [
        { code: 'AURA25', discount: '25%', type: 'Percentage', usage: '154 / 500', expiry: 'Mar 31, 2026', status: 'Active' },
        { code: 'WELCOME10', discount: '$10.00', type: 'Fixed Amount', usage: '842 / ∞', expiry: 'Dec 31, 2026', status: 'Active' },
        { code: 'SPRINGFLY', discount: '15%', type: 'Percentage', usage: '0 / 200', expiry: 'May 20, 2026', status: 'Inactive' },
    ];

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Coupons & Discounts</h1>
                        <p>Create and manage promotional offers</p>
                    </div>
                    <button className="add-product-btn">
                        <FaPlus style={{ marginRight: '8px' }} />
                        New Coupon
                    </button>
                </header>

                <section className="coupons-container">
                    <div className="coupon-grid">
                        {coupons.map((coupon, idx) => (
                            <div key={idx} className="coupon-card">
                                <span className={`status-badge status-${coupon.status.toLowerCase()}`} style={{ float: 'right' }}>
                                    {coupon.status}
                                </span>
                                <div className="coupon-code-badge">{coupon.code}</div>
                                <div className="coupon-discount">{coupon.discount} OFF</div>
                                <div className="coupon-usage">
                                    <strong>Usage:</strong> {coupon.usage}
                                </div>
                                <div className="coupon-expiry">
                                    <FaCalendarDay />
                                    Expires: {coupon.expiry}
                                </div>
                                <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: '10px' }}>
                                    <button className="view-btn" style={{ flex: 1 }}>Edit</button>
                                    <button className="delete-btn" style={{ padding: '8px' }}><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
