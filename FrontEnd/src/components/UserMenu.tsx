/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-console */
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { openModal } from "../hooks/modalSlice";

function UserMenu() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          role="button"
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover: shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => console.log("Login")} />
            <MenuItem label="Sign up" onClick={() => dispatch(openModal())} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
