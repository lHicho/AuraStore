import Hero from "../hero/Hero";

import Filters from "../filters/Filters";
import Deals from "../deals/Deals";
import { FaThumbsUp } from "react-icons/fa6";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <div className="reveal active">
                <Hero />
            </div>
            <hr />
            <div className="reveal">
                <Filters />
            </div>
            <hr />
            <div className="reveal">
                <Deals />
            </div>
            <hr />
            <div className="reveal">
                <Deals
                    title="Recommended for you"
                    icon={<FaThumbsUp className="hot-icon" />}
                />
            </div>
            <Footer />
        </>
    );
}
