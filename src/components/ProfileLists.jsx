import React from 'react'
import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';


const ProfileLists = () => {
    //states
    const [arr, setArr] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [newarr, setNewArr] = useState([]);
    const [wholearr, setWholeArr] = useState([]);
    const [page, setPage] = useState(1);

    const pageArr = [];
    let i = 1;
    while (i <= wholearr.length /8) {
        pageArr.push(i);
        i++;
    }

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
    //pagination....


    // const pageArr = [];
    // let i = 1;
    // while (i <= newarr.length / 8) {
    //     pageArr.push(i);
    //     i++;
    // }
    // const handlePage = (el) => {
    //     setPage(el);
    // };
    // const [page, setPage] = useState(1);


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
    const handlePage = (el) => {
        setPage(el);
    };
    useEffect(() => {
        getData();

    }, [page])


    return (
        <>
            <h1>Profiles</h1>
            <div className="indipro"></div>
            <div className="search">
            <label>🔎</label>
            <input type="text" name="search" id="search" placeholder="search by full name"onChange={(e) => handleChange(e)} value={searchStr} />
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
                                        />
                                    )
                                })
                            }
                            </div>
                            <div className='pageButtons'>
                            {
                                pageArr.map((el) => {
                                    return <button onClick={() => handlePage(el)}>{el}</button>
                                })
                            }
                            </div>
                       </div>
                    ) :
                        (<h1>🦖No data found...</h1>)
                )
            }
             

        </>
    );
}

export default ProfileLists