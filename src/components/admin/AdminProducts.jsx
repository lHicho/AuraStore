import { useState } from 'react';
import { FaMagnifyingGlass, FaCalendarDay, FaPlus } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminOrders.css'; // Reusing some filter styles
import './AdminProducts.css';

export default function AdminProducts() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const products = [
        { name: 'Air Max 90', category: 'Footwear', price: '$129.00', stock: 84, sales: 652 },
        { name: 'Canvas Tote', category: 'Bags', price: '$45.00', stock: 210, sales: 415 },
        { name: 'Retro Shades', category: 'Accessories', price: '$78.00', stock: 8, sales: 298 },
        { name: 'Linen Shirt', category: 'Clothing', price: '$64.00', stock: 130, sales: 180 },
        { name: 'Leather Wallet', category: 'Accessories', price: '$55.00', stock: 12, sales: 155 },
    ];

    const filteredProducts = products.filter(p => {
        const matchesFilter = filter === 'All' || (filter === 'Low stock' && p.stock < 20);
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Products</h1>
                        <p>Manage your product catalogue</p>
                    </div>
                    <div className="top-bar-actions">
                        <div className="date-badge">
                            <FaCalendarDay style={{ marginRight: '8px' }} />
                            Mar 2026
                        </div>
                        <div className="status-dot"></div>
                    </div>
                </header>

                <section className="products-container">
                    <div className="orders-filters-bar">
                        <div className="search-orders-wrapper">
                            <FaMagnifyingGlass />
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="filter-chips">
                            {['All', 'Low stock'].map(f => (
                                <button 
                                    key={f} 
                                    className={`filter-chip ${filter === f ? 'active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <button className="add-product-btn">
                            <FaPlus />
                            Add product
                        </button>
                    </div>

                    <div className="panel orders-table-panel">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Sales</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: 600 }}>{product.name}</td>
                                            <td style={{ color: 'var(--text-muted)' }}>{product.category}</td>
                                            <td style={{ fontWeight: 600 }}>{product.price}</td>
                                            <td>
                                                <span className={product.stock < 20 ? 'stock-low' : 'stock-good'}>
                                                    {product.stock} units
                                                </span>
                                            </td>
                                            <td>{product.sales}</td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="edit-btn">Edit</button>
                                                    <button className="delete-btn">Delete</button>
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
