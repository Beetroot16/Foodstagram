// Home.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css'
import '../styles/Home.css';
import '../styles/Card.css';
import Card from './Card';
import ShowComment from './showComment';
import '../styles/ShowComment.css'

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);

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

    const toggleComment = (posts) => {
        if (show) {
            setShow(false);
        }
        else{
            console.log(item);
            setItem(posts);
            setShow(true);
        }
    };

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
                    <Card posts = {posts} data={data} setData={setData} comment = {comment} setComment={setComment} toggleComment={toggleComment} show = {setShow} setShow = {setShow}/>
                ))}
            </Masonry>
            {
                show && (<ShowComment item = {item} toggleComment= {toggleComment}/>)
            }
        </div>
    );
};

export default Home;
