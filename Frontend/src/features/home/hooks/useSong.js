import { useContext } from "react";
import { getSong } from "../services/song.api";
import SongContext from "../Song.context";

export const useSong = () => {
    const context = useContext(SongContext);

    const { song, setSong, loading, setLoading } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);
        try {
            const data = await getSong({mood});
            setSong(data.song);            
            return data.song;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return ({ loading, song, handleGetSong });

}