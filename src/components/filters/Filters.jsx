import './Filters.css';
import {
    FaLaptop,
    FaShirt,
    FaShoePrints,
    FaGem,
    FaHouse,
    FaBasketball,
    FaSprayCanSparkles,
    FaGamepad,
    FaChevronRight
} from "react-icons/fa6";

const categories = [
    { id: 'all', name: 'All', icon: null },
    { id: 'electronics', name: 'Electronics', icon: <FaLaptop /> },
    { id: 'fashion', name: 'Fashion', icon: <FaShirt /> },
    { id: 'shoes', name: 'Shoes', icon: <FaShoePrints /> },
    { id: 'accessories', name: 'Accessories', icon: <FaGem /> },
    { id: 'home', name: 'Home', icon: <FaHouse /> },
    { id: 'sports', name: 'Sports', icon: <FaBasketball /> },
    { id: 'beauty', name: 'Beauty', icon: <FaSprayCanSparkles /> },
    { id: 'gaming', name: 'Gaming', icon: <FaGamepad /> },
];

export default function Filters() {
    return (
        <section className="filters-section">
            <div className="filters-container">
                <div className="section-header">
                    <h2 className="section-title">Explore Categories</h2>
                    <button className="see-all-btn">
                        <span>See All</span>
                        <FaChevronRight />
                    </button>
                </div>

                <div className="filters-grid">
                    {categories.map((cat) => (
                        <button key={cat.id} className="filter-card">
                            <div className="filter-icon">
                                {cat.icon || <span className="all-text">All</span>}
                            </div>
                            <span className="filter-label">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

