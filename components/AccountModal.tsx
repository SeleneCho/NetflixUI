import { useRecoilState } from "recoil";
import { accountModalState } from "../atoms/accountModalAtoms";
import { useSession, signOut } from "next-auth/react";

const AccountModal = () => {
  const [showModal, setShowModal] = useRecoilState(accountModalState);
  const { data: session } = useSession();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed top-16 right-5 z-50 transition ease-in-out duration-300">
      <div className="accModalContainer w-48 h-40 bg-black items-center justify-center">
        <ul className="p-2 cursor-pointer ">
          <li className="mb-3 ">
            <h1 className="font-light">Username</h1>
            <p className="text-xs font-thin">{session?.user?.name}</p>
          </li>
          <li className="mb-3">
            <h1 className="font-light">Account</h1>
            <p className="text-xs font-thin">{session?.user?.email}</p>
          </li>
          <hr className="accountHr mb-3 " />
          <li onClick={() => signOut()} className="hover:underline">
            <p className="font-light text-sm w-fit left-0 right-0 mx-auto">
              Sign out of Netflix
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountModal;
