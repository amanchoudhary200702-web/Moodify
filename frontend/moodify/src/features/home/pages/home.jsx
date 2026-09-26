import React from 'react'
import FaceExpression from "../../expression/FaceExpression"
import Player from '../component/player'
import { useSong } from '../hooks/useSong'
import "./home.scss"

const Home = () => {

    const {
        handleGetSong,
        playlist,
        setSong
    } = useSong()

    return (
        <main className='home'>

       
      
            <FaceExpression
                onClick={(expression) => {
                    handleGetSong({ mood: expression })
                }}
            />

            <div className="playlist">
                <h2>Your Playlist</h2>

                {playlist.map((item) => (
                    <div
                        key={item._id}
                        className="song-card"
                        onClick={() => setSong(item)}
                    >
                        <img
                            src={item.posterUrl}
                            alt={item.title}
                        />
                          
                        <h3>{item.title}</h3>
                        <p>{item.mood}</p>
                    </div>
                ))}
            </div>

            <Player />
             </main>
   
    )
}

export default Home