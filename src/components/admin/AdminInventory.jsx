import { FaBoxesStacked, FaFloppyDisk } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';
import './AdminInventory.css';

export default function AdminInventory() {
    const stockItems = [
        { name: 'Air Max 90', variant: 'Size: 42, Color: Orange', sku: 'AM90-ORA-42', stock: 12 },
        { name: 'Air Max 90', variant: 'Size: 44, Color: Orange', sku: 'AM90-ORA-44', stock: 5 },
        { name: 'Canvas Tote', variant: 'Default', sku: 'CT-DEF', stock: 210 },
        { name: 'Retro Shades', variant: 'Classic Black', sku: 'RS-BLK', stock: 8 },
    ];

    return (
        <div className="admin-dashboard-layout">
            <AdminSidebar />
            
            <main className="admin-main">
                <header className="admin-top-bar">
                    <div className="page-title">
                        <h1>Inventory Management</h1>
                        <p>Track and bulk-update stock levels per variant</p>
                    </div>
                </header>

                <section className="panel" style={{ margin: 'var(--space-2)' }}>
                    <div className="inventory-grid">
                        {stockItems.map((item, idx) => (
                            <div key={idx} className="inventory-item">
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                                        <span className="variant-tag">{item.variant}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SKU: {item.sku}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span className={item.stock < 10 ? 'stock-low' : 'stock-good'} style={{ fontSize: '14px' }}>
                                        {item.stock} in stock
                                    </span>
                                    <input type="number" defaultValue={item.stock} className="stock-input" />
                                    <button className="view-btn" style={{ padding: '8px' }}><FaFloppyDisk /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
