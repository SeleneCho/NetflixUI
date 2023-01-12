import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { accountModalState } from "../atoms/accountModalAtoms";
import { useSession } from "next-auth/react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useRecoilState(accountModalState);
  const { data: session } = useSession();

  const handleShowModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${isScrolled && "bg-[#141414]"} overflow-auto`}>
        {/* left side */}
        <div className="flex items-center space-x-2 md:space-x-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />

          <ul className="hidden space-x-4 md:flex">
            <li className="headerLine">Home</li>
            <li className="headerLine">TV Shows</li>
            <li className="headerLine">Movies</li>
            <li className="headerLine">New & Popular</li>
            <li className="headerLine">My List</li>
          </ul>
        </div>

        {/* right side */}
        <div className="flex items-center space-x-4 text-sm font-light">
          <SearchOutlinedIcon className="hidden cursor-pointer  h-6 w-6 sm:inline " />
          <p className="hidden lg:inline cursor-pointer">
            {session?.user?.name}
          </p>
          <NotificationsNoneOutlinedIcon className="h-6 w-6" />
          {/* <button onClick={}> */}
          {session?.user ? (
            <img
              src={
                session?.user.image
                  ? session.user.image
                  : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
              className="cursor-pointer rounded h-7 w-7"
              onClick={handleShowModal}
            />
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="rounded px-3 py-1 hover:bg-red-500 bg-red-600"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
