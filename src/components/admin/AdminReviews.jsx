import { useState } from 'react';
import { FaStar, FaCalendarDay, FaCheck, FaXmark } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminReviews.css';

export default function AdminReviews() {
    const [filter, setFilter] = useState('All');
    
    const mockReviews = [
        { id: 1, user: 'Karim L.', product: 'Air Max 90', rating: 5, comment: 'Incredible quality, worth every penny! The orange accents are even better in person.', date: 'Mar 14', status: 'Pending' },
        { id: 2, user: 'Sara K.', product: 'Canvas Tote', rating: 4, comment: 'Very stylish but took a bit longer to arrive than expected.', date: 'Mar 13', status: 'Approved' },
        { id: 3, user: 'Omar H.', product: 'Retro Shades', rating: 2, comment: 'The frame broke after two days. I want a refund.', date: 'Mar 12', status: 'Rejected' },
        { id: 4, user: 'Fatima Z.', product: 'Linen Shirt', rating: 5, comment: 'Perfect fit! Highly recommend to everyone.', date: 'Mar 15', status: 'Pending' },
    ];

    const filteredReviews = mockReviews.filter(r => filter === 'All' || r.status === filter);

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Reviews Moderation</h1>
                        <p>Approve or reject customer feedback</p>
                    </div>
                </header>

                <section className="reviews-container">
                    <div className="orders-filters-bar">
                        <div className="filter-chips">
                            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                                <button 
                                    key={status} 
                                    className={`filter-chip ${filter === status ? 'active' : ''}`}
                                    onClick={() => setFilter(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="reviews-list">
                        {filteredReviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <h4>{review.user}</h4>
                                        <span>{review.date}</span>
                                    </div>
                                    <div className="star-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} style={{ opacity: i < review.rating ? 1 : 0.2 }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="review-product-tag">
                                    Product: <strong>{review.product}</strong>
                                </div>
                                <p className="review-content">"{review.comment}"</p>
                                
                                {review.status === 'Pending' && (
                                    <div className="review-actions">
                                        <button className="approve-btn">
                                            <FaCheck style={{ marginRight: '8px' }} />
                                            Approve
                                        </button>
                                        <button className="reject-btn">
                                            <FaXmark style={{ marginRight: '8px' }} />
                                            Reject
                                        </button>
                                    </div>
                                )}
                                {review.status !== 'Pending' && (
                                    <span className={`status-badge status-${review.status.toLowerCase()}`}>
                                        {review.status}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
