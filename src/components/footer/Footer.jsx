import "./Footer.css";

import whiteLogo from "../../assets/logoWhite.png"
import logo from "../../assets/logo.png"

import { FaArrowUp, FaFacebook, FaInstagram, FaXTwitter, FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay } from "react-icons/fa6";


export default function Footer() {

    return (
        <footer className="footer-container">
            <button 
                onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }} 
                className="go-top-button"
            >
                <span>Back to Top</span>
                <FaArrowUp />
            </button>

            <div className="main-footer-container">
                <div className="company-info">
                    <div className="footer-logo-section">
                        <img src={logo} alt="Aura Store" className="footer-logo" />
                    </div>
                    <p className="company-text">
                        Aura Store is the premier marketplace for modern lifestyles. We curate high-quality products that blend functionality with state-of-the-art design.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="footer-social-btn"><FaFacebook /></a>
                        <a href="#" className="footer-social-btn"><FaInstagram /></a>
                        <a href="#" className="footer-social-btn"><FaXTwitter /></a>
                    </div>
                </div>

                <div className="footer-grid">
                    <div className="footer-col">
                        <h3>Shop</h3>
                        <ul className="footer-links">
                            <li><a href="#">Best Sellers</a></li>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Categories</a></li>
                            <li><a href="#">Deals & Offers</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Help & Support</h3>
                        <ul className="footer-links">
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Returns & Refunds</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Help Center</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Company</h3>
                        <ul className="footer-links">
                            <li><a href="#">About Aura</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="newsletter-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe for exclusive offers and news.</p>
                    <form className="footer-form" onSubmit={(e) => { e.preventDefault(); }}>
                        <div className="input-group">
                            <input type="email" placeholder="Email Address" required />
                            <button type="submit">Join</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bottom-footer">
                <div className="bottom-content">
                    <p className="copyright">© 2026 Aura Store Inc. All rights reserved.</p>
                    
                    <div className="payment-methods">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaPaypal />
                        <FaApplePay />
                    </div>

                    <div className="footer-legal">
                        <a href="#">Legal</a>
                        <a href="#">Cookies</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}