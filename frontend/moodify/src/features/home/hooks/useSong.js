import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong ,playlist,setPlaylist} = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSong({ mood })
        setPlaylist(data.song)
        setSong(data.song[1])
        setLoading(false)

          console.log("MOOD:", mood)
    console.log("SONG DATA:", data.song)
    }

    return ({ loading, song, handleGetSong ,playlist, setSong })

}