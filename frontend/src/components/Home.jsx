import { useEffect } from 'react'
import { useState } from 'react';
import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('jwt');
        if (!token) {
            navigate("/signin")
        }

        //Fetching all posts
        fetch("http://localhost:3000/allPosts", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt"),
            },
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            }).catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <div className='home'>
            { /* CARD */}
            {data.map((posts) => {
                console.log(posts)
                return (
                    <div className="card">
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
                        <div className="card-content">
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                            <p>1 Like</p>
                            <p>{posts.body}</p>
                        </div>
                        {/* Add Comments */}
                        <div className="add-comment">
                            <span className="material-symbols-outlined">
                                mood
                            </span>
                            <input type="text" placeholder='Add a comment' />
                            <button className='comment'>Post</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
