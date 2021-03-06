import {Link} from "react-router-dom"
import axios from "axios"
import {useState} from "react"
import "./Home.css"
require("dotenv").config()

const Home = () => {
    const [videos, setVideos] = useState([])
    const [showList, setShowList] = useState(false)
    const [input, setInput] = useState("")

    const FetchVideos = async () => {
        try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&type=video&key=${process.env.REACT_APP_API_KEY}`)
        debugger
        setVideos(res.data.items)
        } catch (error) {
            setVideos([])
        }
    }

    // useEffect(() =>{
    //     const videoListStorage = localStorage.getItem("videoListStorage")
    //     if (videoListStorage) {
    //       setVideos(JSON.parse(videoListStorage))
    //     }
    //   }, [])
    

    // useEffect(() => {
    //     localStorage.setItem("videoListStorage", JSON.stringify(videos))
    //   })

    const handleSubmit =(e)=>{
        e.preventDefault()
        FetchVideos()
        setShowList(true)

    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    

    return (
        
        <section className="homeContainer">
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={handleChange}/>
                <button>Submit</button>
            </form>
            {showList ? (
          <ul>
              {videos.map((videoObj) => {
                  return <li key={videoObj.id.videoId}><Link to={`/video/${videoObj.id.videoId}`}><img alt="thumbnails" src={videoObj.snippet.thumbnails.default.url} />{videoObj.snippet.title}</Link> </li>  
              })}
          </ul> )
          : <ul> No videos</ul> }
        </section>
    )
}

export default Home