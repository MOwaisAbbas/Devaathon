import axios from "axios"
import { useEffect, useState } from "react"

function About() {
  const [data , setData] = useState([])
  useEffect(() => {
   
  }, [])

  return (
    <div>
      <h1>
        About
      </h1>
      <ul>
        {data && data.map((v,i)=>
        <li key={i}>{v.email}</li>
        )}
      </ul>
    </div>
  )
}

export default About
