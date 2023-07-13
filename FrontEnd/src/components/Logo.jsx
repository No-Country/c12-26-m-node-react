import { GrGoogleWallet } from "react-icons/gr";

function Logo() {
  return (
    <div>
      <GrGoogleWallet
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
      />
    </div>
  );
}

export default Logo;
