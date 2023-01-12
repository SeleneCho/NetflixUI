import Image from "next/image";
import React from "react";
import { Movie } from "../tsDef";
import { useRecoilState } from "recoil";
import { videoModalState, movieState } from "../atoms/videoModalAtoms";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(videoModalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        className="object-cover"
        layout="fill"
      />
    </div>
  );
};

export default Thumbnail;
