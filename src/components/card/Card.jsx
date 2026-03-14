import { Link } from "react-router-dom";
import "./Card.css";
import { useCartStore } from "../../context/zustand.jsx";
import { FaStar, FaCartPlus } from "react-icons/fa6";

export default function Card({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.toString().replace('$', '')),
            image: product.image_url,
            brand: "Aura Premium",
            limit: 10
        });
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-img">
                    <img src={product.image_url} alt={product.name} />
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
                <button onClick={handleAddToCart}><FaCartPlus /></button>
            </div>
        </div>
    );
}