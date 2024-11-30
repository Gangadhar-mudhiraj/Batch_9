import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext'; // Adjust the path as needed
import NewsItem from "./NewsItem";
import { FaUserCircle } from 'react-icons/fa';  // React Icon for the user avatar
import { BsFillBookmarkFill } from 'react-icons/bs';  // React Icon for bookmarks
import { IoIosSearch } from 'react-icons/io';  // Search Icon

export default function Home({ Category }) {
    const { user } = useUser();
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Add a search input

    useEffect(() => {
        let URL = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&apiKey=${import.meta.env.VITE_API_KEY}`;

        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setArticles(data.articles);
            });
    }, [Category]);

    // Filter articles based on search query
    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center">
                    <FaUserCircle className="text-4xl mr-4" />
                    <div>
                        <h1 className="text-4xl font-semibold">{`Welcome, ${user?.username || 'Guest'}!`}</h1>
                        <p className="mt-2 text-lg">This is the home page</p>
                    </div>
                </div>
            </div>

            {/* Category Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-lg mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Latest News
                        <span className="bg-gray-800 ml-3 px-2 py-1 rounded text-white text-sm">
                            {Category.toUpperCase()}
                        </span>
                    </h2>
                    {/* Search Bar */}
                    <div className="flex items-center border border-gray-900 rounded-md px-2 py-1">
                        <IoIosSearch className="text-gray-900 mr-2" />
                        <input
                            type="text"
                            className="outline-none w-full text-gray-900"
                            placeholder="Search news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* No Articles Message */}
                {filteredArticles.length === 0 ? (
                    <p className="text-center text-xl text-gray-600 mt-4">No news available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredArticles.map((news, index) => (
                            news && <NewsItem key={index} news={news} />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg text-center mt-6">
                <BsFillBookmarkFill className="text-gray-800 text-2xl mb-2" />
                <p className="text-lg text-gray-800">Bookmark your favorite news articles!</p>
            </div>
        </div>
    );
}
