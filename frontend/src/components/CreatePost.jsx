import React from 'react'
import { useState } from 'react'
import '../styles/CreatePost.css'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import plus from "../assets/plus.png"

export default function CreatePost() {
    const navigate = useNavigate();
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    //TOAST FUNCTIONS
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    //Posting image to cloudinary
    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Foodstagram");
        data.append("cloud_name", "beetroot16");

        if (localStorage.getItem("jwt") === null) {
            notifyA("Please Login First")
            navigate('/signIn')
        }
        // First, upload the image to Cloudinary
        fetch("https://api.cloudinary.com/v1_1/beetroot16/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                const imageUrl = data.url; // Get the image URL from the Cloudinary response

                // Now, set the URL in state
                setUrl(imageUrl);

                // Next, save posts to MongoDB with the updated URL
                fetch("http://localhost:3000/createPost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + localStorage.getItem("jwt"),
                    },
                    body: JSON.stringify({
                        body,
                        pic: imageUrl, // Use the imageUrl obtained from Cloudinary
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // Handle the response from the MongoDB request
                        if (data.error) {
                            notifyA(data.error)
                        }
                        else {
                            notifyB(data.message)
                            // console.log(data.token)
                            // // localStorage.setItem("jwt",data.token)
                            navigate('/')
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    };
    return (
        <div className="createpost-container">
            <div className='createPost'>
                {/* Post Header */}
                <div className="post-header">
                    <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                    <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
                </div>
                {/* Image Preview */}
                <div className="main-div">
                    <img id="output" src={plus} />
                    <input type="file" accept='image/*'
                        onChange={(event) => {
                            loadFile(event),
                                setImage(event.target.files[0])
                        }} />
                </div>
                {/* Details */}
                <div className="details">
                    <div className="card-header">
                        <div className="card-pic">
                            <img src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="" />
                        </div>
                        <h5>Username</h5>
                    </div>
                    <textarea value={body} type="text" placeholder='write a caption'
                        onChange={(e) => { setBody(e.target.value) }}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}
