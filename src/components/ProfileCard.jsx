import React from 'react'
import './profile.css'

const ProfileCard = (props) => {

     const ShowDetails=(id)=>{
       const individual = document.getElementsByClassName('indipro')[0];
       individual.innerHTML=`<div>${id}</div>`;
       const updateCard = document.createElement('div');
       updateCard.className='update-profile';
     
       fetch(`http://localhost:3004/users/${id}`, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((data) => {
            updateCard.innerHTML= `<div class="top"><img src=${data.profile_picture} class="picture"/>
            <div class="right">
            <div class="username">${data.full_name}</div>
            <div class="insights">
            <div class="followers">${data.followers}<div>followers</div></div>
            <div class="following">${data.following}<div>following</div></div>
            <div class="posts">${data.posts}<div>posts</div></div>
            </div>
            </div>
            </div>
            <div class="bottom">
            <div class="username">${data.username}</div>
            <div class="bio">${data.bio}</div>
            </div>`;
            individual.appendChild(updateCard);
        });
     }
    
    return (
        <>
            <div className="profile" onClick={()=>ShowDetails(props.id)} >
                <img src={props.profile_picture} alt="" />
                <div className="bottom">
                    <div className="username">{props.name}</div>
                    <div className="bio">{props.bio}</div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard