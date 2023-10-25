import React from 'react'

export default function showComment({ item, toggleComment }) {
    return (
        <div className="showComment">
            <div className="container">
                <div className="postPic">
                    <img src={item.photo} alt="" />
                </div>
                <div className="details">
                    {/* Card Header */}
                    <div className="card-header">
                        <div className="card-pic">
                            <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                        </div>
                        <h5>{item.postedBy.username}</h5>
                    </div>
                    {/* Comment Section */}
                    <div className="comment-section">
                        {
                            item.comments.map((comment) => {
                                return (
                                    <p className="comm">
                                        <span style={{fontWeight:"bold"}} className='commenter'>
                                            {comment.postedBy.username}
                                        </span>
                                        <span> </span>
                                        <span className='commentText'>
                                            {comment.comment}
                                        </span>
                                    </p>
                                )
                            })}
                    </div>
                    {/* Card Content */}
                    <div className="card-content-inner">
                        <p className='likecount'>{item.likes.length} Likes</p>
                        <p>{item.body}</p>
                        {/* Add Comments */}
                        <div className="add-comment">
                            <input type="text" placeholder='Add a comment' onChange={(e) => { setComment(e.target.value) }} />
                            <button className='comment'
                            // onClick={() => { makeComment(comment, posts._id) }}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="closeComment" onClick={() => { toggleComment(); }}>
                <span class="material-symbols-outlined material-symbols-outlined-comment">
                    close
                </span>
            </div>
        </div>
    )
}


