import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { useRecoilState } from "recoil";
import { videoModalState, movieState } from "../atoms/videoModalAtoms";
import { Movie, Element, Genre } from "../tsDef";
import axios from "axios";
import ReactPlayer from "react-player/lazy";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(videoModalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await axios.get(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      );
      if (data?.data.videos) {
        const index = data.data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.data.videos?.results[index]?.key);
      }
      if (data?.data.genres) {
        setGenres(data.data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-gray-700"
        >
          <CloseOutlinedIcon className="h-6 w-6" />
        </button>

        {/* player */}
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayCircleIcon className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                <AddOutlinedIcon className="h-7 w-7 " />
              </button>

              <button className="modalButton">
                <ThumbUpAltOutlinedIcon className="h-7 w-7 " />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffOutlinedIcon className="w-6 h-6" />
              ) : (
                <VolumeUpOutlinedIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
