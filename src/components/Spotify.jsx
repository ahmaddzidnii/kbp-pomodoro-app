import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import { Button } from "./Button";

export const Spotify = () => {
  const [playlist, setPlaylist] = useState("");

  const [playlistCommit, setPlaylistCommit] = useState(
    "https://open.spotify.com/embed/album/48VJneXoN4AW5QAT4Ruwkc"
  );

  const handleChangePlaylist = (e) => {
    e.preventDefault();
    if (!playlist.trim()) {
      toast.error("Playlist tidak boleh kosong");
      return;
    }

    const REGEX_SPOTIFY_LINK = /^https:\/\/open\.spotify\.com\/(album|playlist)\/[a-zA-Z0-9]+$/;

    if (!REGEX_SPOTIFY_LINK.test(playlist)) {
      toast.error("URL playlist tidak valid");
      return;
    }

    const EXTRACT_REGEX =
      /^https:\/\/open\.spotify\.com\/(playlist\/[a-zA-Z0-9]+|album\/[a-zA-Z0-9]+)$/;
    const match = playlist.match(EXTRACT_REGEX);

    if (!match) {
      toast.error("URL playlist tidak valid");
      return;
    }
    setPlaylistCommit(`https://open.spotify.com/embed/${match[1]}`);
  };

  return (
    <>
      <div className="w-full relative h-[152px]">
        <div className="absolute inset-0 h-[152px] bg-slate-400/90 rounded-lg animate-pulse" />
        <iframe
          className="absolute inset-0"
          src={playlistCommit}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <form
        className="flex items-center"
        onSubmit={handleChangePlaylist}
      >
        <input
          type="text"
          value={playlist}
          onChange={(e) => {
            setPlaylist(e.target.value);
          }}
          placeholder="masukin url playlist atau album spotify andalan kamu..."
          className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
        />
        <Button
          type="submit"
          className="ml-2 p-4"
        >
          <FaPlus className="size-5" />
        </Button>
      </form>
    </>
  );
};
