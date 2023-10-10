import React from 'react'
import '../styles/Card.css'

export default function Card({ posts, data, setData, setComment}) {
    
    const likePost = (id) => {
        fetch("http://localhost:3000/like", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            const new_data = data.map((posts) => {
                if (posts._id === result._id) {
                    return result
                }
                else {
                    return posts
                }
            })
            setData(new_data)
            console.log(result)
        })
    };

    const unlikePost = (id) => {
        fetch("http://localhost:3000/unlike", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            const new_data = data.map((posts) => {
                if (posts._id === result._id) {
                    return result
                }
                else {
                    return posts
                }
            })
            setData(new_data)
            console.log(result)
        })
    };

    const makeComment = () => {
        console.log(comment)
    }

    return (
        <div className="Card" key={posts._id}>
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
                    {
                        posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                            ?
                            <span className="material-symbols-outlined material-symbols-outlined-red"
                                onClick={() => { unlikePost(posts._id) }}
                            >
                                favorite
                            </span>
                            :
                            (
                                <span className="material-symbols-outlined"
                                    onClick={() => { likePost(posts._id) }}
                                >
                                    favorite
                                </span>
                            )
                    }
                    <p className='likecount'>{posts.likes.length} Likes</p>
                    <p>{posts.body}</p>
                </div>
                {/* Add Comments */}
                <div className="add-comment">
                    <input type="text" placeholder='Add a comment' onChange={(e) => { setComment(e.target.value) }} />
                    <button className='comment'
                        onClick={() => { makeComment() }}
                    >Post</button>
                </div>
            </div>
        </div>
    )
}
