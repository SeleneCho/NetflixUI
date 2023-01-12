import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constant/movie";
import { Movie } from "../tsDef";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { useRecoilState } from "recoil";
import { videoModalState, movieState } from "../atoms/videoModalAtoms";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [mainMovie, setMainMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(videoModalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    // get random movie
    setMainMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col  space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${
            mainMovie?.backdrop_path || mainMovie?.poster_path
          }`}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
        {mainMovie?.title || mainMovie?.name || mainMovie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {mainMovie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <PlayArrowIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(mainMovie);
            setShowModal(true);
          }}
        >
          <InfoIcon className="h-5  w-5 md:h-8 md:w-8 " />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
