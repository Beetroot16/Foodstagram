// Home.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css'
import '../styles/Home.css';
import '../styles/Card.css';
import Card from './card';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            navigate("/signin");
        }

        // Fetching all posts
        fetch("http://localhost:3000/allPosts", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then(res => res.json())
            .then(result => {
                setData(result.posts);
            })
            .catch(err => {
                console.log(err);
            });
    }, [navigate]);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div className="home-container">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="home-masonry-grid"
                columnClassName="home-masonry-grid_column">
                {data.map((posts) => (  
                    <Card posts = {posts} data={data} setData={setData} setComment={setComment} />
                ))}
            </Masonry>
        </div>
    );
};

export default Home;
