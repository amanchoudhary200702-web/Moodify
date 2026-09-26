import { createContext } from "react";
import { useState } from "react";


export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [ song, setSong ] = useState({
        "url": "https://ik.imagekit.io/erml7qcl3/cohort-2/moodify/songs/Sha_Dobara__From___Mismatched_____Season_3___Season_3__n7_jITXsC.mp3",
        "posterUrl": "https://ik.imagekit.io/erml7qcl3/cohort-2/moodify/posters/Sha_Dobara__From___Mismatched_____Season_3___Season_3__PLTeuv7mC.jpeg",
        "title": "Sha Dobara (From ''Mismatched'') [Season 3] (Season 3)",
        "_id": "6a637678681e1b0d288adb95",
    })
    const [playlist, setPlaylist] = useState([])

    const [ loading, setLoading ] = useState(false)

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong ,playlist,setPlaylist}}
        >
            {children}
        </SongContext.Provider>
    )

}