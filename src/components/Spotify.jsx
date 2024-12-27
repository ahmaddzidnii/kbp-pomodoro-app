import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import { Button } from "./Button";
import { BiLoaderCircle } from "react-icons/bi";

export const Spotify = () => {
  const [playlist, setPlaylist] = useState("");

  const [isErrorSpotify, setIsErrorSpotify] = useState(false);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(true);

  const [playlistCommit, setPlaylistCommit] = useState(
    "https://open.spotify.com/embed/album/48VJneXoN4AW5QAT4Ruwkc",
  );

  const handleChangePlaylist = (e) => {
    e.preventDefault();
    if (!playlist.trim()) {
      toast.error("Playlist tidak boleh kosong");
      return;
    }

    const REGEX_SPOTIFY_LINK =
      /^https:\/\/open\.spotify\.com\/(album|playlist)\/[a-zA-Z0-9]+$/;

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
    <div className="rounded-lg bg-white p-5 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat p-4"
          style={{
            backgroundImage: `url("/assets/img/music-icon.png")`,
          }}
        />
        <h1 className="text-xl font-bold">Spotify Player :</h1>
      </div>
      <form className="flex" onSubmit={handleChangePlaylist}>
        <input
          type="text"
          value={playlist}
          onChange={(e) => {
            setPlaylist(e.target.value);
          }}
          placeholder="masukin url playlist atau album spotify andalan kamu..."
          className="w-full rounded-md rounded-e-none border-[3px] border-black p-4 text-lg font-bold placeholder-muted-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-1 focus:ring-black"
        />
        <Button type="submit" className="rounded-s-none p-4">
          <FaPlus className="size-5" />
        </Button>
      </form>
      <div className="relative mt-5 h-[152px] w-full">
        {isLoadingSpotify && (
          <div className="absolute inset-0 flex h-[152px] items-center justify-center">
            <BiLoaderCircle className="size-10 animate-spin" />
          </div>
        )}
        {isErrorSpotify && (
          <div className="absolute inset-0 flex h-[152px] items-center justify-center">
            Terjadi kesalahan saat memuat playlist
          </div>
        )}

        <iframe
          className="absolute inset-0"
          src={playlistCommit}
          onLoad={() => {
            setIsLoadingSpotify(false);
          }}
          onError={() => {
            setIsErrorSpotify(true);
          }}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
