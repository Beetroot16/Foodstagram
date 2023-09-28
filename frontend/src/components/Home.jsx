import React from 'react'
import '../styles/Home.css'

export default function Home() {
    return (
        <div className='home'>
            { /* CARD */}
            <div className="card">
                {/* Card Header */}
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                    </div>
                    <h5>Hello</h5>
                </div>
                {/* Card Image */}
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1569173112611-52a7cd38bea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="" />
                </div>
                {/* Card Content */}
                <div className="card-content">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <p>1 Like</p>
                    <p>Insert Caption Here</p>
                </div>
                {/* Add Comments */}
                <div className="add-comment">
                    <span className="material-symbols-outlined">
                        mood
                    </span>
                    <input type="text" placeholder='Add a comment'/>
                    <button className='comment'>Post</button>
                </div>
            </div>
        </div>
    )
}
