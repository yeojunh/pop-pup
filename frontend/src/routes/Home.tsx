import { BentoGrid } from "../components/ui/BentoGrid";
import Navbar from "../components/ui/Navbar";

const Home = () => {
    return (
        <div className="bg-garden-darkshade text-center">
            <Navbar />
            <p className="font-serif text-4xl">
                Pop-pup
            </p>
            <p className="font-thin">
                The browser extension for daily *adoptable* animal photos
            </p>
            <BentoGrid />
        </div>
    )
}

export default Home;