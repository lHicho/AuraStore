import { Link } from "react-router-dom";
import "./Card.css";

import { FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

export default function Card({ product }) {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-img">
                    <img src={product.image_url} alt="product pic" />
                    <div className="discount">20%</div>
                </div>
                <h2>{product.name}</h2>
            </Link>
            <div className="rating">
                <FaStar />
                <p>4.5 <span>(2.5k reviews)</span></p>
            </div>
            <div className="price-container">
                <div className="price">
                    <p>{product.price}</p>
                    <p className="old-price">$200</p>
                </div>
                <button><FaCartPlus /></button>
            </div>
        </div>
    );
}