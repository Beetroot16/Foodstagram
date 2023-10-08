import { useEffect, useState } from 'react'
import React from 'react'
import '../styles/Profile.css'
import Masonry from 'react-masonry-css'

export default function Profile() {
    const [pic, setPic] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/myPosts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            method: 'GET',
        }).then(res => res.json()).then(result => {
            setPic(result.posts);
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
                className="home-masonry-grid"
                columnClassName="home-masonry-grid_column">
                {pic.map((posts) => (
                    <div className="card" key={posts._id}>
                        {/* Card Content */}
                        <div className="card-content">
                            {/* Card Header */}
                            {/* <div className="card-header">
                                <div className="card-pic">
                                    <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                                </div>
                                <h5>{posts.postedBy.username}</h5>
                            </div> */}
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
                            {/* <div className="add-comment">
                                <input type="text" placeholder='Add a comment' />
                                <button className='comment'>Post</button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </Masonry>
            </div>
        </div>
    )
}
