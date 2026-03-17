import './Deals.css';
import Card from '../card/Card';
import { FaFire, FaChevronRight } from "react-icons/fa6";


import { useEffect, useState } from 'react'
import { supabase } from '../../context/supabase.jsx'


export default function Deals({ title = "Best Deals of Today", icon = <FaFire className="hot-icon" /> }) {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('products')
                .select('*')

            if (error) console.log('Error:', error)
            else setData(data)
        }

        fetchData()
    }, [])

    return (
        <section className="deals-section">
            <div className="deals-container">
                <div className="section-header">
                    <div className="title-with-icon">
                        {icon}
                        <h2 className="section-title">{title}</h2>
                    </div>
                    <button className="see-all-btn" onClick={() => window.location.href = '/products'}>
                        <span>View All Deals</span>
                        <FaChevronRight />
                    </button>
                </div>

                <div className="deals-grid">
                    {data.length > 0 ? (
                        data.map((deal) => (
                            <Card key={deal.id} product={deal} />
                        ))
                    ) : (
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="card-skeleton">
                                <div className="skeleton-img"></div>
                                <div className="skeleton-title"></div>
                                <div className="skeleton-price"></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}


