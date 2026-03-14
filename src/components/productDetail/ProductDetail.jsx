import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../../context/zustand.jsx";
import { 
    FaStar, 
    FaCartPlus, 
    FaArrowLeft, 
    FaHeart, 
    FaShareNodes, 
    FaShieldHeart, 
    FaTruckFast, 
    FaRotateLeft,
    FaStore,
    FaXmark
} from "react-icons/fa6";



import "./ProductDetail.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

// Temporary Mock Data - Usually this would come from an API based on the ID
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Aura Pro Gaming Headset",
        price: "$129.99",
        oldPrice: "$180",
        rating: 4.8,
        reviews: "1.2k",
        description: "Experience immersive sound with the Aura Pro Gaming Headset. Featuring custom-tuned 50mm drivers, memory foam ear cushions, and a crystal-clear noise-canceling microphone.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1000"
        ],
        colors: ["#000000", "#ff5500", "#ffffff"],
        specs: {
            "Driver": "50mm Neodymium",
            "Frequency": "20Hz - 20kHz",
            "Impedance": "32 Ohm",
            "Weight": "320g"
        },
        seller: {
            name: "Aura Official Store",
            rating: 4.9,
            followers: "125k",
            joined: "2 years ago",
            isOfficial: true
        },
        reviewsData: {
            average: 4.8,
            total: 1248,
            distribution: [
                { stars: 5, count: 850 },
                { stars: 4, count: 250 },
                { stars: 3, count: 100 },
                { stars: 2, count: 30 },
                { stars: 1, count: 18 }
            ],
            comments: [
                { id: 1, user: "Alex M.", rating: 5, date: "2 days ago", text: "Best headset I've ever owned. The spatial audio is actually incredible for gaming." },
                { id: 2, user: "Sarah J.", rating: 4, date: "1 week ago", text: "Very comfortable for long sessions, though the mic is a bit sensitive." }
            ]
        },
        bundle: [
            { id: "b1", name: "Aura RGB Mousepad", price: "$29.99", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=500" },
            { id: "b2", name: "Aura Pro Mouse", price: "$59.99", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500" }
        ]
    }
];

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("specs"); // "specs" or "reviews"
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        // Find product by ID
        const foundProduct = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
    }, [id]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y, show: true });
    };

    if (!product) return <div className="loading">Loading...</div>;

    return (
        <>
            <Header />
            <section className="pdp-section">
                <div className="pdp-container">
                    {/* Header / Breadcrumbs */}
                    <div className="pdp-header">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <FaArrowLeft /> Back
                        </button>
                        <div className="pdp-actions-top">
                            <button className="action-circle"><FaHeart /></button>
                            <button className="action-circle"><FaShareNodes /></button>
                        </div>
                    </div>

                    <div className="pdp-three-column-grid">
                        {/* 1. LEFT: Gallery (Sticky) */}
                        <div className="pdp-col-left">
                            <div className="vertical-gallery">
                                <div className="side-thumbnails">
                                    {product.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`side-thumb ${activeImage === idx ? 'active' : ''}`}
                                            onMouseEnter={() => setActiveImage(idx)}
                                        >
                                            <img src={img} alt={`thumb ${idx}`} />
                                        </div>
                                    ))}
                                </div>
                                <div 
                                    className="main-image-zoom-container"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={() => setZoomPos(prev => ({ ...prev, show: false }))}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <img 
                                        src={product.images[activeImage]} 
                                        alt={product.name} 
                                        className="display-img"
                                    />
                                    {zoomPos.show && (
                                        <div 
                                            className="zoom-lens"
                                            style={{
                                                backgroundImage: `url(${product.images[activeImage]})`,
                                                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 2. MIDDLE: Info */}
                        <div className="pdp-col-middle">
                            <div className="product-info-block">
                                <div className="info-head">
                                    <span className="pdp-badge">Bestseller</span>
                                    <h1>{product.name}</h1>
                                    
                                    <div className="seller-name-row-inline">
                                        <p>Store: <strong>{product.seller.name}</strong></p>
                                        {product.seller.isOfficial && <span className="official-badge">Official</span>}
                                    </div>

                                    <div className="pdp-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < Math.floor(product.rating) ? 'active' : ''} />
                                            ))}
                                        </div>
                                        <span>{product.rating} ({product.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div className="pdp-price">
                                    <span className="current">{product.price}</span>
                                    <span className="old">{product.oldPrice}</span>
                                    <span className="save-tag">SAVE 30%</span>
                                </div>

                                <div className="pdp-options">
                                    {/* Color Selection */}
                                    <div className="option-group">
                                        <h3>Choose Color</h3>
                                        <div className="color-grid">
                                            {product.colors.map(color => (
                                                <button
                                                    key={color}
                                                    className={`color-dot ${selectedColor === color ? 'active' : ''}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setSelectedColor(color)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="details-summary">
                                    <h3>Quick Details</h3>
                                    <p className="pdp-desc">{product.description}</p>
                                    <div className="mini-specs">
                                        {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                                            <div key={key} className="mini-spec-item">
                                                <strong>{key}:</strong> {val}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Frequently Bought Together */}
                                <div className="bundle-section">
                                    <h3>Frequently Offers</h3>
                                    <div className="bundle-container">
                                        <div className="bundle-items">
                                            <div className="bundle-item main">
                                                <img src={product.images[0]} alt="main" />
                                                <span>Current Item</span>
                                            </div>
                                            <span className="plus-icon">+</span>
                                            {product.bundle.map(item => (
                                                <div key={item.id} className="bundle-item">
                                                    <img src={item.image} alt={item.name} />
                                                    <div className="bundle-item-info">
                                                        <p>{item.name}</p>
                                                        <strong>{item.price}</strong>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bundle-action">
                                            <div className="bundle-total">
                                                <p>Total Price:</p>
                                                <h2>$219.97</h2>
                                            </div>
                                            <button className="bundle-add-btn">Add All to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. RIGHT: Purchase info */}
                        <div className="pdp-col-right">
                            <div className="purchase-card">
                                <div className="price-stack">
                                    <p className="label">Total Price</p>
                                    <h2 className="price-value">{product.price}</h2>
                                    <p className="stock-status">In Stock</p>
                                </div>

                                <div className="qty-control">
                                    <p>Quantity</p>
                                    <div className="qty-selector">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div>
                                </div>

                                <div className="purchase-buttons">
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => {
                                            const addToCart = useCartStore.getState().addToCart;
                                            for(let i = 0; i < quantity; i++) {
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: parseFloat(product.price.toString().replace('$', '')),
                                                    image: product.images[0],
                                                    brand: product.seller.name,
                                                    description: product.description,
                                                    category: "Audio & Tech",
                                                    limit: 10
                                                });
                                            }
                                            navigate('/cart');
                                        }}
                                    >
                                        <FaCartPlus /> Add to Cart
                                    </button>
                                    <button className="buy-now-btn" onClick={() => navigate('/cart')}>Buy Now</button>
                                </div>

                                <div className="pdp-trust-badges stack">
                                    <div className="trust-item row">
                                        <FaTruckFast />
                                        <span>Free Shipping available</span>
                                    </div>
                                    <div className="trust-item row">
                                        <FaRotateLeft />
                                        <span>30-Day Returns</span>
                                    </div>
                                    <div className="trust-item row">
                                        <FaShieldHeart />
                                        <span>2-Year Warranty</span>
                                    </div>
                                </div>

                                <div className="seller-mini-box">
                                    <div className="avatar"><FaStore /></div>
                                    <div className="mini-info">
                                        <p>Seller: {product.seller.name}</p>
                                        <span><FaStar /> {product.seller.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Details Tabs */}
                    <div className="pdp-details-tabs">
                        <div className="tabs-nav">
                            <button 
                                className={activeTab === 'specs' ? 'active' : ''} 
                                onClick={() => setActiveTab('specs')}
                            >
                                Specifications
                            </button>
                            <button 
                                className={activeTab === 'reviews' ? 'active' : ''} 
                                onClick={() => setActiveTab('reviews')}
                            >
                                Customer Reviews ({product.reviewsData.total})
                            </button>
                        </div>
                        
                        <div className="tab-content">
                            {activeTab === 'specs' ? (
                                <div className="specs-grid">
                                    {Object.entries(product.specs).map(([key, val]) => (
                                        <div key={key} className="spec-row">
                                            <span className="spec-key">{key}</span>
                                            <span className="spec-val">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="reviews-tab">
                                    <div className="reviews-summary-grid">
                                        <div className="rating-total">
                                            <h2>{product.reviewsData.average}</h2>
                                            <div className="stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < Math.floor(product.reviewsData.average) ? 'active' : ''} />
                                                ))}
                                            </div>
                                            <p>Based on {product.reviewsData.total} reviews</p>
                                        </div>
                                        <div className="rating-bars">
                                            {product.reviewsData.distribution.map(item => (
                                                <div key={item.stars} className="bar-row">
                                                    <span>{item.stars} <FaStar /></span>
                                                    <div className="bar-bg">
                                                        <div 
                                                            className="bar-fill" 
                                                            style={{ width: `${(item.count / product.reviewsData.total) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="bar-count">({item.count})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="reviews-list">
                                        {product.reviewsData.comments.map(comment => (
                                            <div key={comment.id} className="review-item">
                                                <div className="review-meta">
                                                    <strong>{comment.user}</strong>
                                                    <span>{comment.date}</span>
                                                </div>
                                                <div className="stars mini">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={i < comment.rating ? 'active' : ''} />
                                                    ))}
                                                </div>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Image Overlay Modal */}
            {isModalOpen && (
                <div className="pdp-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                        <FaXmark />
                    </button>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-main-img">
                            <img src={product.images[activeImage]} alt="Enlarged product" />
                        </div>
                        <div className="modal-thumbnails">
                            {product.images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`modal-thumb ${activeImage === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`thumb ${idx}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
