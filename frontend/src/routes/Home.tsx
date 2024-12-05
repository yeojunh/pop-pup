import { Bento } from "../components/layouts/Bento";

const Home = () => {
    return (
        <div className="bg-garden-darkshade text-center">
            <p className="font-serif text-4xl">
                Pop-pup
            </p>
            <p className="font-thin">
                The browser extension for daily *adoptable* animal photos
            </p>
            <Bento />
        </div>
    )
}

export default Home;