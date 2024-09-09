// news-frontend/src/components/News.js
import React, { useState, useEffect } from 'react';
import { fetchNews, searchNews } from '../api';
import img from "../img/13.jpeg"

const News = () => {
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Number of articles per page
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState(new Date());


    
    const currDate = new Date().toLocaleDateString();
// const currTime = new Date().toLocaleTimeString();

    // Fetch top headlines on component mount and when page changes
    useEffect(() => {
        console.log(articles, "articles");
        setInterval(() => setTime(new Date()),1000);

        if (query) {
            // If there's a search query, perform search
            handleSearch();
        } else {
            // Otherwise, fetch top headlines
            //   console.log("fisrt log", articles);

            fetchNews(page, limit)
                .then(response => {
                    setArticles(response.data.articles);
                    setTotalArticles(response.data.totalArticles);
                    
                })
                .catch(error => {
                    console.error('Error fetching news:', error);
                });
        }
    }, [page]);

    // Handle Search
    const handleSearch = () => {
        console.log(articles);

        if (!query) return;

        searchNews(query, region, category, page, limit)
            .then(response => {
                setArticles(response.data.articles);
                setTotalArticles(response.data.totalArticles);
            })
            .catch(error => {
                console.error('Error searching news:', error);
            });
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1); // Reset to first page on new search
        handleSearch();
    };

    // Handle Pagination
    const totalPages = Math.ceil(totalArticles / limit);

    return (
        <div className=' bg-slate-100 '>
            <div className=' h-[80px] bg-gray-200 flex items-center gap-5 p-4 justify-between  rounded md:ml-10 md:mr-10'>
                <h1 className=' font-bold text-[25px] md:text-[30px]  cursor-pointer text-[#2377fe]'>aconews</h1>
                
                {/* Search Form */}
                <form onSubmit={handleSubmit} className=' gap-2 flex flex-row'>
                    <input
                        className=' border-none outline-none sm:px-3 p-1 rounded'
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                    {/* <input
          type="text"
          placeholder="Region (e.g., us)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category (e.g., technology)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}
                    <button type="submit"
                        className=' flex items-center justify-center'
                    >
                        <svg fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </form>

            </div>
            <div className=' hidden md:block text-center'>
                    <span>{time.toLocaleTimeString()}</span>
                </div>

<div className=' flex flex-col items-center justify-center p-2'>
    <h1 className=' font-medium text-[25px]  sm:text-[40px]'>Breaking Stories, Trusted Voices.</h1>
    <span>{currDate}</span>
</div>
            <div className=' grid lg:grid-cols-3 lg:px-32 md:grid-cols-2 gap-8 p-8 '>
                {articles.map(article => (
                    <div className=' bg-white rounded-[15px] flex overflow-auto flex-col'>
                       <img src={article.image} className=' h-[150px]' />
                       <a href={article.url} target='_blank'><h3 className=' font-bold mt-1 text-[18px] p-4 text-[#2377fe] text-center cursor-pointer'>{article.title}</h3></a> 
                        <p className=' px-4 text-gray-500'>{article.description}</p>
                        <div className=' flex items-center justify-between p-4'>
                        <p className="text-tiny text-gray-500 uppercase font-bold">{article.source.name}</p>
                        <h4 className=" text-large text-gray-500">{article.publishedAt.slice(0,10)}</h4>
                        </div>
                    </div>
                ))}
            </div>


            {/* Pagination Controls */}
            <div className=' bg-gray-100 flex items-center justify-center gap-5 p-4'>
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className=' font-thin'> Page {page} of {totalPages} </span>
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default News;
