import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [foodname, setfoodname] = useState("")
  const [days, setdays] = useState(0)
  const [newfoodname, setnewfoodname] = useState("")
  const [foodlist, setfoodlist] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/read").then((response) => {
      setfoodlist(response.data)
    })
  }, [])

  const addToList = () => {
    axios.post("http://localhost:3000/insert", {
      foodname: foodname,
      daysSinceIAte: days
    }).then(() => {
    axios.get("http://localhost:3000/read").then((response) => {
      setfoodlist(response.data)
    })
  })
  }

  const updatefood = (id) => {
    axios.put("http://localhost:3000/update", {
      id: id,
      newfoodname: newfoodname
    })
  }

  const deletefood = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
  }

  return (
    <div className='App'>
      <h2>Add Food</h2>
      foodname: <input
        type="text"
        onChange={(event) => setfoodname(event.target.value)}
      />
      days since you ate: <input
        type="number"
        onChange={(event) => setdays(event.target.value)}
      />
      <button onClick={addToList}>Add</button>

      <h2>Food List</h2>
      {foodlist.map(val => (
        <div key={val._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h3>{val.foodname}</h3>
          <p>Days since eaten: {val.daysSinceIAte}</p>
          <input 
            type="text" 
            placeholder="New food name" 
            onChange={(event) => setnewfoodname(event.target.value)} 
          />
          <button onClick={() => updatefood(val._id)}>Update</button>
          <button onClick={() => deletefood(val._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App