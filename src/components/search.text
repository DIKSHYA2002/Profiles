import React, { useEffect, useState } from 'react'
import MovieCards from './MovieCards'
function MovieList() {
  const [arr, setArr] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [newarr, setNewArr] = useState([]);

  const handleChange = (e) => {
    setSearchStr(e.target.value);
  };
  const getSearchedData = () => {
    const newData = arr.filter((item) => item.name.toLowerCase().includes(searchStr.toLowerCase()))
    setNewArr(newData);
  };

    useEffect(() => {
      getSearchedData();
    }, [searchStr]);
    
  const getData = async () => {
    await fetch("http://localhost:3301/data", {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setArr(data);
      });
  };
  const obj = {
    name: "Spiderman:Across the Spider-Verse",
    image: "https://i0.wp.com/aiptcomics.com/wp-content/uploads/2019/03/spider-verse-featured-miles-min.jpg?resize=1000%2C563&ssl=1",
    about: "Spider-Man: Across the Spider-Verse is a 2023 American computer-animated superhero film featuring the Marvel Comics character Miles Morales / Spider-Man ",
    rating: "9.1⭐",
    releaseDate: "April 14,2023",
    Genre: ["animation", "action", "adventure", "fantasy"]
  }
  //post
  const handlePost = async () => {
    await fetch("http://localhost:3301/data", {
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
  //patch
  const handlePatch = async (id) => {
    const newName = prompt("enter the new name")
    await fetch(`http://localhost:3301/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
       
      }),
    }).then((res) => {
      if (res.ok) {
        alert("updated");
        getData();
      }
    });

  };
//delete
const handleDelete= async(id)=>{
  await fetch(`http://localhost:3301/data/${id}`,{
    method : "DELETE"
}).then((res)=>{
  if(res.ok){
    alert("Deleted");
    getData();
  }
});
}
//patch


  // update-put
  // const handlePut = async (id) => {
  //   await fetch(`http://localhost:3301/data/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Spiderman:Across the Spider-Verse",
  //       image: "https://i0.wp.com/aiptcomics.com/wp-content/uploads/2019/03/spider-verse-featured-miles-min.jpg?resize=1000%2C563&ssl=1",
  //       about: "Spider-Man: Across the Spider-Verse is a 2023 American computer-animated superhero film featuring the Marvel Comics character Miles Morales / Spider-Man ",
  //       rating: "9.1⭐",
  //       releaseDate: "April 14,2023",
  //       Genre: ["animation", "action", "adventure", "fantasy"]
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       alert("updated");
  //       getData();
  //     }
  //   });

  // };

  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='movie-list'>
      <input type="text" name="search" id="search" onChange={(e) => handleChange(e)} value={searchStr}  />
      <button onClick={handlePost}>POST</button>
      { newarr.length>0?(
        <div>
        { newarr.map((e) => {
          return (
            <MovieCards
              movie_name={e.name}
              image={e.image}
              about={e.about}
              rating={e.rating}
              releaseDate={e.releaseDate}
              Genre={e.Genre}
              onClick={() => handlePatch(e.id)}
              onclick = {()=> handleDelete(e.id)}
              buttonText="update" 
              buttonText2 = "delete"/>
          )
        })}
        </div>
          ):(searchStr.length==0 ?(<div>{arr.map((e)=>{return(
            <MovieCards
            movie_name={e.name}
            image={e.image}
            about={e.about}
            rating={e.rating}
            releaseDate={e.releaseDate}
            Genre={e.Genre}
            onClick={() => handlePatch(e.id)}
            onclick = {()=> handleDelete(e.id)}
            buttonText="update" 
            buttonText2 = "delete"/>
          )})}</div>):
        <h1>No data found</h1>)}
    </div>
  );
}

export default MovieList