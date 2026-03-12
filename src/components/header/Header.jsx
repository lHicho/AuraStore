import { useState, useEffect, useRef } from "react";
import { useThemeStore, useUserStore } from "../../context/zustand.jsx";
import { FaUser } from "react-icons/fa6";
import "./Header.css";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";

import { FaMagnifyingGlass, FaLocationDot, FaCaretDown, FaMoon, FaBars, FaXmark, FaAngleRight, FaCar } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(null); // 'categories', 'filters', 'lang', 'profile'
    const [formData, setFormData] = useState({
        filter: "All",
        term: ""
    });

    const isLightTheme = useThemeStore((state) => state.light);
    const switchTheme = useThemeStore((state) => state.swichTheme);

    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);

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
        console.log("Searching for:", formData);
        closeAllMenus();
    };

    const selectFilter = (filter) => {
        setFormData(prev => ({ ...prev, filter }));
        setActiveMenu(null);
    };

    return (
        <>
            {/* Unified Overlay */}
            <div
                className={`global-overlay ${activeMenu ? "show" : ""}`}
                onClick={closeAllMenus}
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

                    <div className="search-section">
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
                        <div className="action-item location-btn">
                            <button className="icon-btn">
                                <FaLocationDot />
                                <span className="label">New York</span>
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

                        <div className="action-item cart-btn">
                            <FaShoppingCart />
                            <span className="cart-badge">3</span>
                        </div>

                        {user ? (
                            <div className="action-item profile-section">
                                <div className="profile-trigger" onClick={() => toggleMenu('profile')}>
                                    <img src={profile} alt="User profile" />
                                </div>
                                {activeMenu === 'profile' && (
                                    <div className="dropdown-menu profile-menu">
                                        <div className="menu-item">My Profile</div>
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


                        <button className="action-item icon-btn more-menu-btn">
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


            {/* Sidebar Categories Menu */}
            <aside className={`categories-sidebar ${activeMenu === 'categories' ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Navigation</h2>
                    <button className="close-sidebar" onClick={closeAllMenus}>
                        <FaXmark />
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="promo-banner">
                        <div className="promo-text">
                            <h3>Exclusive Offers</h3>
                            <p>Up to 50% off on Tech</p>
                        </div>
                        <FaAngleRight />
                    </div>

                    <div className="sidebar-section">
                        <h4>Categories</h4>
                        <ul className="sidebar-list">
                            <li className="list-item">
                                <div className="item-main">
                                    <FaCar />
                                    <span>Car Accessories</span>
                                </div>
                                <FaAngleRight />
                            </li>
                            {/* More items... */}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h4>Trending</h4>
                        <ul className="sidebar-list">
                            <li className="list-item"><span>Beauty & Care</span><FaAngleRight /></li>
                            <li className="list-item"><span>Smart Living</span><FaAngleRight /></li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
}
