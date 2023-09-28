import React from 'react'
import '../styles/CreatePost.css'

export default function CreatePost() {
    const loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    };
    return (
        <div className='createPost'>
            {/* Post Header */}
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button id="post-btn">Share</button>
            </div>
            {/* Image Preview */}
            <div className="main-div">
                <img id="output" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"/>
                <input type="file" accept='image/*' 
                onChange={(event) => {loadFile(event)}}/>
            </div>
            {/* Details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                    </div>
                    <h5>Username</h5>
                </div>
                <textarea type="text" placeholder='write a caption'></textarea>
            </div>
        </div>
    )
}
