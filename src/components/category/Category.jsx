import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../../context/supabase.jsx";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Card from "../card/Card.jsx";
import { 
    FaFilter, 
    FaArrowDownWideShort, 
    FaChevronRight, 
    FaStar, 
    FaSliders, 
    FaXmark 
} from "react-icons/fa6";
import "./Category.css";

const categories = [
    { id: 'electronics', name: 'Electronics', tags: ['laptop', 'mobile', 'headphone'] },
    { id: 'fashion', name: 'Fashion', tags: ['shirt', 'pant', 'shoe'] },
    { id: 'accessories', name: 'Accessories', tags: ['ring', 'watch', 'bag'] },
    { id: 'home', name: 'Home', tags: ['furniture', 'decor', 'lighting'] },
    { id: 'sports', name: 'Sports', tags: ['gym', 'yoga', 'outdoor'] },
    { id: 'beauty', name: 'Beauty', tags: ['skin', 'hair', 'makeup'] },
    { id: 'gaming', name: 'Gaming', tags: ['console', 'game', 'pc'] },
];

export default function Category() {
    const { categoryId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
    const [visibleCount, setVisibleCount] = useState(8);

    const categoryName = categories.find(c => c.id === categoryId)?.name || "All Products";

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = supabase.from('products').select('*');

            const searchTerm = searchParams.get('search');
            const filterType = searchParams.get('filter');

            if (categoryId && categoryId !== 'all') {
                query = query.eq('category', categoryId);
            }

            if (searchTerm) {
                query = query.ilike('name', `%${searchTerm}%`);
            }

            if (filterType && filterType !== 'All') {
                // Assuming filter matches category or some other field
                query = query.eq('category', filterType.toLowerCase());
            }

            // Apply Sort
            if (sortBy === 'price-low') {
                query = query.order('price', { ascending: true });
            } else if (sortBy === 'price-high') {
                query = query.order('price', { ascending: false });
            } else {
                query = query.order('created_at', { ascending: false });
            }

            const { data, error } = await query;

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [categoryId, sortBy]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        setSearchParams({ sort: value });
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const loadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    return (
        <div className="category-page">
            <Header />

            <main className="category-main">
                {/* Breadcrumbs */}
                <div className="breadcrumbs-container">
                    <nav className="breadcrumbs">
                        <a href="/">Home</a>
                        <FaChevronRight className="divider" />
                        <span className="current">{categoryName}</span>
                    </nav>
                </div>

                <div className="category-layout">
                    {/* Sidebar Filters */}
                    <aside className={`category-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                        <div className="sidebar-header-mobile">
                            <h3>Filters</h3>
                            <button className="close-sidebar" onClick={toggleSidebar}>
                                <FaXmark />
                            </button>
                        </div>
                        
                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <div className="price-inputs">
                                <div className="input-field">
                                    <span>$</span>
                                    <input type="number" placeholder="Min" />
                                </div>
                                <span className="dash">-</span>
                                <div className="input-field">
                                    <span>$</span>
                                    <input type="number" placeholder="Max" />
                                </div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Rating</h4>
                            {[5, 4, 3, 2, 1].map(star => (
                                <label key={star} className="rating-filter">
                                    <input type="checkbox" />
                                    <div className="stars">
                                        {[...Array(star)].map((_, i) => <FaStar key={i} className="star filled" />)}
                                        {[...Array(5 - star)].map((_, i) => <FaStar key={i} className="star" />)}
                                    </div>
                                    <span>& Up</span>
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Availability</h4>
                            <label className="checkbox-filter">
                                <input type="checkbox" />
                                <span>In Stock</span>
                            </label>
                            <label className="checkbox-filter">
                                <input type="checkbox" />
                                <span>On Sale</span>
                            </label>
                            <label className="checkbox-filter">
                                <input type="checkbox" />
                                <span>Fast Delivery</span>
                            </label>
                        </div>

                        <button className="clear-filters">Clear All Filters</button>
                    </aside>

                    {/* Content Section */}
                    <section className="listing-content">
                        {/* Toolbar */}
                        <div className="listing-toolbar">
                            <div className="toolbar-left">
                                <button className="mobile-filter-btn" onClick={toggleSidebar}>
                                    <FaSliders />
                                    <span>Filters</span>
                                </button>
                                <p className="result-count">
                                    Showing <strong>1 - {Math.min(visibleCount, products.length)}</strong> of {products.length} products
                                </p>
                            </div>

                            <div className="toolbar-right">
                                <div className="sort-wrapper">
                                    <FaArrowDownWideShort className="sort-icon" />
                                    <select value={sortBy} onChange={handleSortChange}>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="best-selling">Best Selling</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="products-grid-skeleton">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="skeleton-card">
                                        <div className="skeleton-image"></div>
                                        <div className="skeleton-text"></div>
                                        <div className="skeleton-text short"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="products-grid">
                                    {products.slice(0, visibleCount).map((product) => (
                                        <Card key={product.id} product={product} />
                                    ))}
                                </div>

                                {visibleCount < products.length && (
                                    <div className="load-more-container">
                                        <button className="load-more-btn" onClick={loadMore}>
                                            Load More Products
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-products">
                                <img src="/no-results.png" alt="No products" className="no-result-img" />
                                <h3>No matching products found</h3>
                                <p>Try adjusting your search or filters to find what you're looking for.</p>
                                <button className="clear-btn">Clear All Filters</button>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
