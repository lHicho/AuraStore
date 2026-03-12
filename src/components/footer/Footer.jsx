import "./Footer.css";

import whiteLogo from "../../assets/logoWhite.png"
import logo from "../../assets/logo.png"

import { FaArrowUp } from "react-icons/fa6";


export default function Footer() {

    return (
        <footer className="footer-container">
            <button onClick={()=>{window.scrollTo({top: 0, behavior: "smooth"})}} className="go-top-button">Go back to top <FaArrowUp /></button>
            <div className="main-footer-container">
                <div className="company-info">
                    <div className="imgs">
                        <img src={logo} alt="logo" />
                        <img src={whiteLogo} alt="logo" />
                    </div>
                    <div className="company-text">
                        The premier marketplace for smoked orange lifestyle products. Quality, design, and innovation delivered to your doorstep.
                    </div>
                </div>
                <div className="shop side-info">
                    <h1>Shop</h1>
                    <a href="#">Best Sellers</a>
                    <a href="#">New Arrivals</a>
                    <a href="#">Trending</a>
                    <a href="#">Promotions</a>
                </div>
                <div className="company side-info">
                    <h1>Company</h1>
                    <a href="#">About Us</a>
                    <a href="#">Contact Support</a>
                    <a href="#">Careers</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div className="newsletter side-info">
                    <h1>Newsletter</h1>
                    <p>Get the latest deals and update directly in your inbox.</p>
                    <form onSubmit={(e) => { e.preventDefault(); console.log("hello") }}>
                        <input type="emain" placeholder="Your email address" name="email" />
                        <button type="submit">subscribe</button>
                    </form>
                </div>
            </div>
            <hr />
            <div className="second-footer-container">
                <div className="rights">
                    <p>© 2024 MarketHub E-Commerce Platform. All rights reserved.</p>
                </div>
                <div className="legal-links">
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Settings</a>
                    <a href="#">Security</a>
                </div>
                <div className="banking-infos">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>
            </div>
        </footer>
    )
}