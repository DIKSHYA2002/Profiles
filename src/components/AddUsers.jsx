import React from 'react'
import { useState,useEffect } from 'react';
const AddUsers = () => {
    const [arr, setArr] = useState([]);
    const handleProfile=()=>{
        const imagesrc = document.getElementById('postimage');
        const imagelink = document.getElementById('dp2').value;
        imagesrc.src=imagelink;

    }
    // handlePost
    const handlePost = async () => {
        const username = document.getElementById('username2').value;
        const full_name = document.getElementById('full_name2').value;
        const following = document.getElementById('following2').value;
        const follower = document.getElementById('follower2').value;
        const posts = document.getElementById('post2').value;
        const verified = document.getElementById('verified2').checked;
        const profile_picture = document.getElementById('dp2').value;
        const bio = document.getElementById('bio2').value;
        const obj = {
            username: username,
            full_name: full_name,
            following: following,
            follower: follower,
            posts: posts,
            verified: verified,
            profile_picture: profile_picture,
            bio: bio,
        }
        console.log(obj);
        await fetch("http://localhost:3004/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then((res) => {
            if (res.ok) {
                alert("Posted");
                getData();
            }
        });
    }
    const getData = async () => {
        await fetch("http://localhost:3004/users", {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {

                setArr(data);
            });
    };
    useEffect(() => {
        getData();

    }, [])


  return (
    <>
    <div className="add-profile">
                <div className="form-left-image">
                    <img src="https://th.bing.com/th/id/OIP.gTWYgYaOiuzJUsE35WMMeAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="" id='postimage' />
                    <label>Image</label>
                    <div className="submit">
                        <button type="submit" onClick={handlePost}>ADD</button>
                    </div>
                </div>
                <div className="form-left">
                    <div className="usernname">
                        <label>USERNAME</label>
                        <input type="text" name="username" id="username2" />
                    </div>
                    <div className="full_name">
                        <label>FULL NAME</label>
                        <input type="text" name="full_name" id="full_name2" />
                    </div>
                    <div className="followers">
                        <label>FOLLOWERS</label>
                        <input type="text" name="" id="follower2" />
                    </div>
                    <div className="following">
                        <label>FOLLOWING</label>
                        <input type="text" name="" id="following2" />
                    </div>
                    
                </div>
                <div className="form-right">
                <div className="posts">
                        <label>POSTS</label>
                        <input type="text" name="" id="post2" />
                    </div>
                    <div className="profile_picture">
                        <label>PROFILE PICTURE</label>
                        <input type="text" name="dp" id="dp2" onChange={handleProfile}/>
                    </div>

                    <div className="bio">
                        <label>BIO</label>
                        <input type="text" name="" id="bio2" />

                    </div>
                    <div className="verified">
                        <label>VERIFIED?</label>
                        <input type="checkbox" name="verified" id="verified2" />
                    </div>
                  
                </div>


            </div>
            </>
  )
}

export default AddUsers