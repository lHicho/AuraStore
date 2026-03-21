import { useState, useEffect, useRef } from "react";
import { useThemeStore, useUserStore, useCartStore, useLocationStore } from "../../context/zustand.jsx";
import { FaUser } from "react-icons/fa6";
import "./Header.css";
import logo from "../../assets/logo.png";
import defaultProfileImage from "../../assets/profile.png";

import { 
    FaMagnifyingGlass, 
    FaLocationDot, 
    FaCaretDown, 
    FaMoon, 
    FaBars, 
    FaXmark, 
    FaAngleRight, 
    FaCar, 
    FaThumbsUp, 
    FaFacebook, 
    FaInstagram, 
    FaXTwitter,
    FaCompass
} from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const MOROCCAN_CITIES = [
    "Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", 
    "Fes", "Meknes", "Oujda", "Kenitra", "Tetouan"
];

export default function Header() {

    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(null); // 'categories', 'filters', 'lang', 'profile'
    const [formData, setFormData] = useState({
        filter: "All",
        term: ""
    });
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const isLightTheme = useThemeStore((state) => state.light);
    const switchTheme = useThemeStore((state) => state.swichTheme);

    const { user, profile, logout } = useUserStore();
    const cart = useCartStore((state) => state.cart);
    const currentCity = useLocationStore((state) => state.city);
    const setCity = useLocationStore((state) => state.setCity);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        console.log("Current User:", user);
        console.log("Current Profile:", profile);
    }, [user, profile]);

    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const closeAllMenus = () => setActiveMenu(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.term.trim()) {
            navigate(`/search?q=${encodeURIComponent(formData.term)}&category=${formData.filter === 'All' ? '' : formData.filter}`);
        } else {
            navigate('/products');
        }
        setShowMobileSearch(false);
        closeAllMenus();
    };

    const selectFilter = (filter) => {
        setFormData(prev => ({ ...prev, filter }));
        setActiveMenu(null);
    };

    const displayName =
        profile?.full_name ||
        profile?.name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.full_name ||
        user?.name ||
        user?.email ||
        "User";

    const avatarUrl =
        profile?.avatar_url ||
        user?.user_metadata?.avatar_url ||
        defaultProfileImage;

    return (
        <>
            {/* Unified Overlay */}
            <div
                className={`global-overlay ${activeMenu || showLocationModal || showMobileSearch ? "show" : ""}`}
                onClick={() => {
                    closeAllMenus();
                    setShowLocationModal(false);
                    setShowMobileSearch(false);
                }}
            />

            <header className="header">
                <div className="header-container">
                    <div className="left-container">
                        <div className="logo-section" onClick={() => navigate('/')}>
                            <img src={logo} alt="Aura Store Logo" className="main-logo" />
                        </div>

                        <button
                            className={`nav-trigger ${activeMenu === 'categories' ? 'active' : ''}`}
                            onClick={() => toggleMenu('categories')}
                        >
                            <FaBars />
                            <span>All Categories</span>
                        </button>
                    </div>

                    <div className="search-section desktop-only">
                        <form onSubmit={handleSubmit} className="search-form">
                            <div className="filter-dropdown">
                                <button
                                    type="button"
                                    className="filter-trigger"
                                    onClick={() => toggleMenu('filters')}
                                >
                                    <span>{formData.filter}</span>
                                    <FaCaretDown className={activeMenu === 'filters' ? 'rotate' : ''} />
                                </button>

                                {activeMenu === 'filters' && (
                                    <div className="dropdown-menu filters-menu">
                                        {["All", "Tech", "Beauty", "Fashion", "Home"].map(f => (
                                            <div key={f} className="menu-item" onClick={() => selectFilter(f)}>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                type="text"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                                placeholder="Search for products, brands..."
                                autoComplete="off"
                            />

                            <button type="submit" className="search-submit">
                                <FaMagnifyingGlass />
                            </button>
                        </form>
                    </div>

                    <div className="header-actions">
                        <div className="action-item search-mobile-trigger">
                            <button className="icon-btn" onClick={() => setShowMobileSearch(true)}>
                                <FaMagnifyingGlass />
                            </button>
                        </div>

                        <div className="action-item location-btn">
                            <button className="icon-btn" onClick={() => setShowLocationModal(true)}>
                                <FaLocationDot />
                                <span className="label">{currentCity}</span>
                            </button>
                        </div>

                        <div className="action-item language-selector">
                            <button onClick={() => toggleMenu('lang')} className="icon-btn">
                                <MdLanguage />
                                <span className="label">EN</span>
                            </button>

                            {activeMenu === 'lang' && (
                                <div className="dropdown-menu lang-menu">
                                    <div className="menu-item active">English</div>
                                    <div className="menu-item">Français</div>
                                    <div className="menu-item">العربية</div>
                                </div>
                            )}
                        </div>

                        <button className="action-item icon-btn theme-toggle" onClick={switchTheme}>
                            {isLightTheme ? <FaMoon /> : <IoSunny />}
                        </button>

                        <div className="action-item cart-btn" onClick={() => navigate('/cart')}>
                            <FaShoppingCart />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>

                        {user ? (
                            <div className="action-item profile-section">
                                <div className="profile-trigger" onClick={() => toggleMenu('profile')}>
                                    <img src={avatarUrl} alt="User profile" />
                                </div>
                                {activeMenu === 'profile' && (
                                    <div className="dropdown-menu profile-menu">
                                        <div className="menu-item" onClick={() => { navigate('/profile'); closeAllMenus(); }}>My Profile</div>
                                        <div className="menu-item">My Orders</div>
                                        <hr style={{ margin: '5px 0', opacity: 0.1 }} />
                                        <div className="menu-item" onClick={() => { logout(); closeAllMenus(); }}>Logout</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="action-item sign-in-trigger"
                                onClick={() => navigate('/login')}
                            >
                                <FaUser />
                                <span>Sign In</span>
                            </button>
                        )}


                        <button 
                            className={`action-item icon-btn more-menu-btn ${activeMenu === 'more' ? 'active' : ''}`}
                            onClick={() => toggleMenu('more')}
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>

                <div className="header-sub">
                    <div className="sub-container">
                        <div className="offers-list">
                            <div className="offer-item active">
                                <span className="badge">New</span>
                                <p>Free Shipping on orders over $50</p>
                            </div>
                            <div className="offer-item">
                                <p>Flash Sale: Electronics up to 40% Off</p>
                            </div>
                            <div className="offer-item">
                                <p>Student Discount available</p>
                            </div>
                        </div>

                        <nav className="sub-nav">
                            <Link to="/">Best Sellers</Link>
                            <a href="#">Gift Ideas</a>
                            <a href="#">New Releases</a>
                            <Link to="/register" className="special">Sell on Aura</Link>
                        </nav>
                    </div>
                </div>
            </header>


            {/* Left Sidebar - Categories */}
            <aside className={`categories-sidebar ${activeMenu === 'categories' ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Categories</h2>
                    <button className="close-sidebar" onClick={closeAllMenus}>
                        <FaXmark />
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="promo-banner">
                        <div className="promo-text">
                            <h3>Aura Prime</h3>
                            <p>Get free shipping on all orders</p>
                        </div>
                        <FaAngleRight />
                    </div>

                    <div className="sidebar-section">
                        <h4>Shop by Category</h4>
                        <ul className="sidebar-list">
                            {[
                                { name: "Electronics & Tech", icon: <FaMagnifyingGlass />, id: "electronics" },
                                { name: "Fashion & Apparel", icon: <FaUser />, id: "fashion" },
                                { name: "Home & Garden", icon: <FaLocationDot />, id: "home" },
                                { name: "Beauty & Health", icon: <FaThumbsUp />, id: "beauty" },
                                { name: "Sports & Outdoors", icon: <FaCar />, id: "sports" },
                                { name: "Toys & Games", icon: <FaCaretDown />, id: "toys" },
                                { name: "Books & Media", icon: <MdLanguage />, id: "books" }
                            ].map((cat, idx) => (
                                <li key={idx} className="list-item" onClick={() => { navigate(`/category/${cat.id}`); closeAllMenus(); }}>
                                    <div className="item-main">
                                        <span className="cat-icon">{cat.icon}</span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <FaAngleRight className="chevron" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Trending Now</h4>
                        <ul className="sidebar-list">
                            <li className="list-item" onClick={() => { navigate('/products'); closeAllMenus(); }}>
                                <span>New Arrivals</span>
                                <FaAngleRight className="chevron" />
                            </li>
                            <li className="list-item" onClick={() => { navigate('/products'); closeAllMenus(); }}>
                                <span>Best Sellers</span>
                                <FaAngleRight className="chevron" />
                            </li>
                            <li className="list-item" onClick={() => { navigate('/products'); closeAllMenus(); }}>
                                <span>Flash Deals</span>
                                <FaAngleRight className="chevron" />
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>


            {/* Right Sidebar - More Options & Profile */}
            <aside className={`right-sidebar ${activeMenu === 'more' ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="user-profile-summary">
                        {user ? (
                            <>
                                <div className="user-avatar">
                                    <img src={avatarUrl} alt="Avatar" />
                                </div>
                                <div className="user-info">
                                    <span className="welcome">Hello,</span>
                                    <span className="name">{displayName}</span>
                                </div>
                            </>
                        ) : (
                            <div className="guest-info" onClick={() => navigate('/login')}>
                                <FaUser />
                                <span>Sign In / Register</span>
                            </div>
                        )}
                    </div>
                    <button className="close-sidebar" onClick={closeAllMenus}>
                        <FaXmark />
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="sidebar-section">
                        <h4>Shopping Experience</h4>
                        <ul className="sidebar-list">
                            <li className="list-item" onClick={closeAllMenus}>
                                <div className="item-main">
                                    <FaThumbsUp />
                                    <span>My Wishlist</span>
                                </div>
                                <span className="item-badge">12</span>
                            </li>
                            <li className="list-item" onClick={closeAllMenus}>
                                <div className="item-main">
                                    <FaLocationDot />
                                    <span>Track Order</span>
                                </div>
                            </li>
                            <li className="list-item" onClick={closeAllMenus}>
                                <div className="item-main">
                                    <FaCar />
                                    <span>Shipping Policy</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Customer Support</h4>
                        <ul className="sidebar-list">
                            <li className="list-item" onClick={closeAllMenus}>
                                <div className="item-main">
                                    <span>Live Chat</span>
                                </div>
                                <div className="status-dot green"></div>
                            </li>
                            <li className="list-item" onClick={closeAllMenus}><span>Help Center / FAQ</span></li>
                            <li className="list-item" onClick={closeAllMenus}><span>Contact Us</span></li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Account Settings</h4>
                        <ul className="sidebar-list">
                            <li className="list-item" onClick={() => { navigate('/profile'); closeAllMenus(); }}><span>Your Account</span></li>
                            <li className="list-item" onClick={switchTheme}>
                                <span>{isLightTheme ? 'Dark Mode' : 'Light Mode'}</span>
                                {isLightTheme ? <FaMoon /> : <IoSunny />}
                            </li>
                            {user && (
                                <li className="list-item logout-link" onClick={() => { logout(); closeAllMenus(); }}>
                                    <span>Sign Out</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Recently Viewed</h4>
                        <div className="recent-products">
                            <div className="recent-item">
                                <div className="recent-thumb"></div>
                                <div className="recent-info">
                                    <p>Ultra Pro Watch</p>
                                    <span>$299.00</span>
                                </div>
                            </div>
                            <div className="recent-item">
                                <div className="recent-thumb"></div>
                                <div className="recent-info">
                                    <p>Wireless Earbuds</p>
                                    <span>$89.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <div className="social-links">
                            <a href="#" className="social-btn"><FaFacebook /></a>
                            <a href="#" className="social-btn"><FaInstagram /></a>
                            <a href="#" className="social-btn"><FaXTwitter /></a>
                        </div>
                        <p className="footer-copyright">© 2026 Aura Store. All rights reserved.</p>
                    </div>
                </div>
            </aside>
            {/* Location Modal */}
            {showLocationModal && (
                <div className="centered-modal location-modal">
                    <div className="modal-header">
                        <h3>Choose your location</h3>
                        <button onClick={() => setShowLocationModal(false)}><FaXmark /></button>
                    </div>
                    <div className="modal-body">
                        <p className="modal-subtitle">Select a city in Morocco to see delivery options and local offers.</p>
                        
                        <div className="locate-me-btn" onClick={() => { setCity("Casablanca"); setShowLocationModal(false); }}>
                            <FaCompass />
                            <span>Locate Me (Detect Location)</span>
                        </div>

                        <div className="cities-grid">
                            {MOROCCAN_CITIES.map(city => (
                                <button 
                                    key={city} 
                                    className={`city-btn ${currentCity === city ? 'active' : ''}`}
                                    onClick={() => { setCity(city); setShowLocationModal(false); }}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="mobile-search-overlay show">
                    <div className="search-popup-header">
                        <img src={logo} alt="Logo" className="mini-logo" />
                        <button className="close-popup" onClick={() => setShowMobileSearch(false)}>
                            <FaXmark />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="popup-search-form">
                        <div className="popup-filter-row">
                            {["All", "Tech", "Beauty", "Fashion", "Home"].map(f => (
                                <button 
                                    key={f} 
                                    type="button"
                                    className={`popup-filter-pill ${formData.filter === f ? 'active' : ''}`}
                                    onClick={() => selectFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="popup-input-wrapper">
                            <input
                                autoFocus
                                type="text"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                                placeholder="Search products..."
                            />
                            <button type="submit">
                                <FaMagnifyingGlass />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
