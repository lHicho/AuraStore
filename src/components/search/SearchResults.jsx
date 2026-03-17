import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../context/supabase.jsx";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Card from "../card/Card.jsx";
import { 
    FaArrowDownWideShort, 
    FaChevronRight, 
    FaStar, 
    FaSliders, 
    FaXmark,
    FaMagnifyingGlass,
    FaRegFaceFrown
} from "react-icons/fa6";
import "./SearchResults.css";

const MOCK_SUGGESTIONS = [
    { id: 1, name: "Ultra Pro Watch", price: "$299.00", image_url: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Wireless Earbuds", price: "$89.00", image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400" },
];

const COLORS = [
    { name: 'Midnight', hex: '#111827' },
    { name: 'Cloud', hex: '#F9FAFB' },
    { name: 'Ocean', hex: '#3B82F6' },
    { name: 'Forest', hex: '#10B981' },
    { name: 'Sunset', hex: '#EF4444' },
];

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);
    
    // Active Filters State
    const [activeFilters, setActiveFilters] = useState({
        category: searchParams.get('category') || null,
        minPrice: searchParams.get('min') || '',
        maxPrice: searchParams.get('max') || '',
        color: searchParams.get('color') || null,
        rating: searchParams.get('rating') || null,
        inStock: searchParams.get('stock') === 'true',
    });

    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            let supabaseQuery = supabase.from('products').select('*');

            // --- Semantic Simulation ---
            const synonyms = {
                'laptop': ['computer', 'pc', 'notebook', 'macbook'],
                'shoe': ['sneaker', 'runner', 'footwear', 'trainers'],
                'watch': ['smartwatch', 'clock', 'timepiece', 'wearable'],
                'phone': ['mobile', 'smartphone', 'iphone', 'android']
            };

            let searchTerm = query.toLowerCase();
            let orStrings = [`name.ilike.%${searchTerm}%`, `description.ilike.%${searchTerm}%` || ''];

            // Add synonyms to the query
            Object.keys(synonyms).forEach(key => {
                if (searchTerm.includes(key)) {
                    synonyms[key].forEach(syn => {
                        orStrings.push(`name.ilike.%${syn}%`);
                    });
                }
            });

            if (query) {
                supabaseQuery = supabaseQuery.or(orStrings.join(','));
            }

            // Apply Filters
            if (activeFilters.category) supabaseQuery = supabaseQuery.eq('category', activeFilters.category);
            if (activeFilters.minPrice) supabaseQuery = supabaseQuery.gte('price', activeFilters.minPrice);
            if (activeFilters.maxPrice) supabaseQuery = supabaseQuery.lte('price', activeFilters.maxPrice);
            if (activeFilters.inStock) supabaseQuery = supabaseQuery.gt('stock', 0);
            
            // Note: Rating and Color filtering typically requires more complex schema, 
            // simulating basic results for now.

            // Sorting
            if (sortBy === 'price-low') {
                supabaseQuery = supabaseQuery.order('price', { ascending: true });
            } else if (sortBy === 'price-high') {
                supabaseQuery = supabaseQuery.order('price', { ascending: false });
            } else if (sortBy === 'newest') {
                supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
            }

            const { data, error } = await supabaseQuery;
            if (error) console.error("Search error:", error);
            else setProducts(data || []);
            
            setLoading(false);
        };

        fetchResults();
    }, [query, activeFilters, sortBy]);

    const toggleFilter = (key, value) => {
        const newFilters = { ...activeFilters, [key]: activeFilters[key] === value ? null : value };
        setActiveFilters(newFilters);
        
        // Update URL
        const params = new URLSearchParams(searchParams);
        if (newFilters[key]) params.set(key, newFilters[key]);
        else params.delete(key);
        setSearchParams(params);
    };

    const removeFilter = (key) => {
        const newFilters = { ...activeFilters, [key]: key === 'inStock' ? false : null };
        setActiveFilters(newFilters);
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        setSearchParams(params);
    };

    const clearAll = () => {
        setActiveFilters({ category: null, minPrice: '', maxPrice: '', color: null, rating: null, inStock: false });
        navigate(`/search?q=${query}`);
    };

    return (
        <div className="search-page">
            <Header />

            <main className="search-main">
                {/* Search Header */}
                <div className="search-query-header">
                    <div className="query-info">
                        <h1>
                            {products.length > 0 ? (
                                <>Showing results for <span>"{query}"</span></>
                            ) : (
                                <>No exact matches for <span>"{query}"</span></>
                            )}
                        </h1>
                        <p className="results-count">{products.length} items found</p>
                    </div>

                    <div className="active-chips">
                        {activeFilters.category && (
                            <div className="filter-chip">
                                {activeFilters.category} <FaXmark onClick={() => removeFilter('category')} />
                            </div>
                        )}
                        {activeFilters.color && (
                            <div className="filter-chip">
                                {activeFilters.color} <FaXmark onClick={() => removeFilter('color')} />
                            </div>
                        )}
                        {(activeFilters.minPrice || activeFilters.maxPrice) && (
                            <div className="filter-chip">
                                ${activeFilters.minPrice || 0} - ${activeFilters.maxPrice || '∞'} 
                                <FaXmark onClick={() => { removeFilter('minPrice'); removeFilter('maxPrice'); }} />
                            </div>
                        )}
                        {Object.values(activeFilters).some(v => v !== null && v !== false && v !== '') && (
                            <button className="clear-all-link" onClick={clearAll}>Clear All</button>
                        )}
                    </div>
                </div>

                <div className="search-layout">
                    {/* PC Sidebar / Mobile Drawer */}
                    <aside className={`search-filters ${isFilterDrawerOpen ? 'mobile-open' : ''}`}>
                        <div className="filter-header-mobile">
                            <h3>Filters & Refinements</h3>
                            <FaXmark onClick={() => setIsFilterDrawerOpen(false)} />
                        </div>

                        <div className="filter-section">
                            <h4>Related Categories</h4>
                            <div className="nested-categories">
                                {['Electronics', 'Accessories', 'Wearables'].map(cat => (
                                    <label key={cat} className="facet-label">
                                        <input 
                                            type="radio" 
                                            name="category" 
                                            checked={activeFilters.category === cat}
                                            onChange={() => toggleFilter('category', cat)}
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Color Swatches</h4>
                            <div className="color-swatches">
                                {COLORS.map(c => (
                                    <button 
                                        key={c.name} 
                                        className={`swatch ${activeFilters.color === c.name ? 'active' : ''}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                        onClick={() => toggleFilter('color', c.name)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Price Range</h4>
                            <div className="price-slider-mock">
                                <div className="slider-track">
                                    <div className="slider-handle left" />
                                    <div className="slider-handle right" />
                                </div>
                                <div className="price-inputs">
                                    <input type="number" placeholder="Min" value={activeFilters.minPrice} onChange={(e) => toggleFilter('minPrice', e.target.value)} />
                                    <span>to</span>
                                    <input type="number" placeholder="Max" value={activeFilters.maxPrice} onChange={(e) => toggleFilter('maxPrice', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Availability</h4>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={activeFilters.inStock}
                                    onChange={(e) => toggleFilter('inStock', e.target.checked)}
                                />
                                <span className="slider"></span>
                                <span className="text">In Stock Only</span>
                            </label>
                        </div>

                        <button className="apply-filters-btn" onClick={() => setIsFilterDrawerOpen(false)}>
                            Show Results
                        </button>
                    </aside>

                    {/* Results Area */}
                    <section className="results-content">
                        <div className="toolbar">
                            <button className="mobile-filter-trigger" onClick={() => setIsFilterDrawerOpen(true)}>
                                <FaSliders /> Filter & Sort
                            </button>
                            
                            <div className="sort-dropdown">
                                <span>Sort by:</span>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="relevance">Relevance</option>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="results-grid skeleton-view">
                                {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="results-grid">
                                {products.slice(0, visibleCount).map(p => (
                                    <Card key={p.id} product={p} />
                                ))}
                                {visibleCount < products.length && (
                                    <button className="search-load-more" onClick={() => setVisibleCount(v => v + 4)}>
                                        Load More
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="no-results-state">
                                <FaRegFaceFrown className="frown-icon" />
                                <h2>We couldn't find matches for "{query}"</h2>
                                <p>Try checking your spelling or using more general terms.</p>
                                
                                <div className="suggestions-box">
                                    <h3>Suggested for you</h3>
                                    <div className="suggestion-grid">
                                        {MOCK_SUGGESTIONS.map(s => (
                                            <div key={s.id} className="suggest-item">
                                                <div className="suggest-thumb"><img src={s.image_url} alt={s.name} /></div>
                                                <div className="suggest-info">
                                                    <p>{s.name}</p>
                                                    <span>{s.price}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Mobile Sticky Filter */}
            <div className={`mobile-sticky-actions ${isFilterDrawerOpen ? 'hide' : ''}`}>
                <button className="floating-filter-btn" onClick={() => setIsFilterDrawerOpen(true)}>
                    <FaSliders />
                    <span>Quick Filter</span>
                </button>
            </div>

            <Footer />
        </div>
    );
}
