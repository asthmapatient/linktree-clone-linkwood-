import { auth } from "@/auth";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import Logout from "./buttons/Logout";
const Header = async () => {
  const session = await auth();
  return (
    <header className="bg-white  ">
      <div className="max-w-5xl mx-auto  p-4 flex justify-between items-center">
        <div className="flex gap-6 ">
          <div className="flex gap-2 items-center text-blue-400 text-xl">
            <FaLink />
            <Link href={"/"}>LinkWood</Link>
          </div>
          <nav className="flex gap-5 items-center text-slate-400 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <nav className="flex gap-3 items-center text-sm text-slate-500">
          {!session ? (
            <>
              {" "}
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </>
          ) : (
            <>
              <Link className="mr-4" href={"/account"}>
                Hello , {session?.user?.name}
              </Link>
              <Logout />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
