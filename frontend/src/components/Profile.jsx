import { useEffect, useState } from 'react'
import React from 'react'
import '../styles/Profile.css'
import Masonry from 'react-masonry-css'
import Card from './card'
import '../styles/card.css'

export default function Profile() {
    const [data, setData] = useState([])
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/myPosts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            method: 'GET',
        }).then(res => res.json()).then(result => {
            setData(result.posts);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const breakpointColumnsObj = {
        default: 5,
        1730: 4,
        1410: 3,
        1120: 2,
        528: 1
    };

    return (
        <div className='profile'>
            {/* Profile Frame */}
            <div className="profile-frame">
                {/* Profile Pic */}
                <div className="profile-pic">
                    <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                </div>
                {/* Profile Name */}
                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info">
                        <p>X Posts</p>
                        <p>Y Followers</p>
                        <p>Z Following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", margin: "30px auto", opacity: "0.8" }} />
            {/* Gallery */}
            <div className="gallery">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="profile-masonry-grid"
                columnClassName="profile-masonry-grid_column">
                {data.map((posts) => (  
                    <Card posts = {posts} data={data} setData={setData} setComment={setComment} />
                ))}
            </Masonry>
            </div>
        </div>
    )
}
