// Home.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css'
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const masonryRef = useRef(null);

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
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {data.map((posts) => (
                    <div className="card" key={posts._id}>
                        {/* Card Content */}
                        <div className="card-content">
                            {/* Card Header */}
                            <div className="card-header">
                                <div className="card-pic">
                                    <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                                </div>
                                <h5>{posts.postedBy.username}</h5>
                            </div>
                            {/* Card Image */}
                            <div className="card-image">
                                <img src={posts.photo} alt="" />
                            </div>
                            {/* Card Content */}
                            <div className="card-content-inner">
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                                <p className='likecount'>9 Likes</p>
                                <p>{posts.body}</p>
                            </div>
                            {/* Add Comments */}
                            <div className="add-comment">
                                <input type="text" placeholder='Add a comment' />
                                <button className='comment'>Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default Home;
