import React from 'react'
import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import Navbar from './Navbar';
const GetUsers = () => {
    const [arr, setArr] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [newarr, setNewArr] = useState([]);
    const [wholearr, setWholeArr] = useState([]);
    const [page, setPage] = useState(1);
    const pageArr = [];
    let i = 1;
    while (i <= Math.ceil(wholearr.length / 8)) {
        pageArr.push(i);
        i++;
    }
    const handlePage = (el) => {
        setPage(el);
    };

    //search
    const handleChange = (e) => {
        setSearchStr(e.target.value);
    };
    const getSearchedData = () => {
        const newData = arr.filter((item) => item.full_name.replace(/ /g, "").toLowerCase().includes(searchStr.toLowerCase()))
        setNewArr(newData);
    };
    useEffect(() => {
        getSearchedData();
    }, [searchStr]);

    //delete
    const handleDelete = async (id) => {
        await fetch(`http://localhost:3004/users/${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                alert("Deleted");
                getData();
            }
        });
    }
    //handle profile
    const handleProfile = () => {
        const imagesrc = document.getElementById('updateimage');
        const imagelink = document.getElementById('dp').value;
        imagesrc.src = imagelink;
    }
    //patch
    const handleEdit = async (id) => {
        fetch(`http://localhost:3004/users/${id}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                const userdata = {
                    id: data.id,
                    username: data.username,
                    full_name: data.full_name,
                    bio: data.bio,
                    profile_picture: data.profile_picture,
                    followers: data.followers,
                    following: data.following,
                    posts: data.posts,
                    verified: data.verified
                }
                document.getElementsByClassName('edit-profile')[0].style.display = 'flex';
                document.getElementById('ids').value = userdata.id;
                document.getElementById('username').value = userdata.username;
                document.getElementById('full_name').value = userdata.full_name;
                document.getElementById('bio').value = userdata.bio;
                document.getElementById('dp').value = userdata.profile_picture;
                document.getElementById('follower').value = userdata.followers;
                document.getElementById('following').value = userdata.following;
                document.getElementById('post').value = userdata.posts;
                document.getElementById('verified').value = userdata.verified;

            });



    }
    const handlePatch = async () => {
        const id = document.getElementById('ids').value;
        const username = document.getElementById('username').value;
        const full_name = document.getElementById('full_name').value;
        const bio = document.getElementById('bio').value;
        const followers = document.getElementById('follower').value;
        const following = document.getElementById('following').value;
        const posts = document.getElementById('post').value;
        const profile_picture = document.getElementById('dp').value;
        const verified = document.getElementById('verified').value;
        const userdata = {
            username: username,
            full_name: full_name,
            bio: bio,
            profile_picture: profile_picture,
            followers: followers,
            following: following,
            posts: posts,
            verified: verified,
        }
        await fetch(`http://localhost:3004/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
        }).then((res) => {
            if (res.ok) {
                alert("updated");
                getData();
            }
        });

    };


    //get Function-use effect
    const getData = async () => {
        await fetch("http://localhost:3004/users", {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {

                setWholeArr(data);
                const end = page *8;
                const start = page - 1;
                const newData = data.slice(start *8, end);
                setArr(newData);
            });
    };
    useEffect(() => {
        getData();

    }, [page])
    return (

        <>
            <Navbar />
            <input type="text" name="search" id="search" placeholder="search by full name" onChange={(e) => handleChange(e)} value={searchStr} />
            <h1>Profiles</h1>
            <div className="indipro">
            </div>
            <div className="edit-profile add-profile">
                <div className="form-left-image">
                    <img src="https://th.bing.com/th/id/OIP.gTWYgYaOiuzJUsE35WMMeAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="" id='updateimage' />
                    <label>Image</label>
                    <input type="number" name="" id="ids" />
                    <div className="submit">
                        <button type="submit" onClick={handlePatch}>UPDATE</button>
                    </div>
                </div>
                <div className="form-left">
                    <div className="usernname">
                        <label>USERNAME</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="full_name">
                        <label>FULL NAME</label>
                        <input type="text" name="full_name" id="full_name" />
                    </div>
                    <div className="followers">
                        <label>FOLLOWERS</label>
                        <input type="text" name="" id="follower" />
                    </div>
                    <div className="following">
                        <label>FOLLOWING</label>
                        <input type="text" name="" id="following" />
                    </div>

                </div>
                <div className="form-right">
                    <div className="posts">
                        <label>POSTS</label>
                        <input type="text" name="" id="post" />
                    </div>
                    <div className="profile_picture">
                        <label>PROFILE PICTURE</label>
                        <input type="text" name="dp" id="dp" onChange={handleProfile} />
                    </div>

                    <div className="bio">
                        <label>BIO</label>
                        <input type="text" name="" id="bio" />
                    </div>
                    <div className="verified">
                        <label>VERIFIED?</label>
                        <input type="checkbox" name="verified" id="verified" />
                    </div>
                </div>
            </div>

            {
                newarr.length > 0 ? (
                    <div>
                        <div className='Lists'>

                            {
                                newarr.map((e) => {
                                    return (
                                        <ProfileCard
                                            key={e.id}
                                            id={e.id}
                                            name={e.username}
                                            followers={e.followers}
                                            following={e.following}
                                            bio={e.bio}
                                            profile_picture={e.profile_picture}
                                            verified={e.verified}
                                            onUpdate={() => handleEdit(e.id)}
                                            onDelete={() => handleDelete(e.id)}

                                        />
                                    )
                                })
                            }


                        </div>

                    </div>


                ) : (
                    searchStr.length == 0 ? (
                        <div className='Original'>
                            <div className='Lists'>
                                {
                                    arr.map((e) => {
                                        return (
                                            <ProfileCard
                                                key={e.id}
                                                id={e.id}
                                                name={e.username}
                                                followers={e.followers}
                                                following={e.following}
                                                bio={e.bio}
                                                profile_picture={e.profile_picture}
                                                verified={e.verified}
                                                onUpdate={() => handleEdit(e.id)}
                                                onDelete={() => handleDelete(e.id)}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) :
                        (<h1>🦖No data found...</h1>)
                )
            }
            <div className='pageButtons'>
            {
               

                pageArr.map((el) => {
                    return <button onClick={() => handlePage(el)}>{el}</button>

                })
              

            }
            </div>


        </>
    )
}

export default GetUsers