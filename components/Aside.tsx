"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog, FaLink } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import Logout from "./buttons/Logout";

const Aside = ({ page }: any) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className="bg-blue-100 sticky right-0 top-0  h-screen  flex flex-col rounded-xl gap-10 items-center  py-5 px-10 ">
      <div className="flex gap-2 items-center text-blue-400 text-xl">
        <Link href={`/${page.uri}`}>
          <FaLink />
        </Link>
        <Link href={"/account"}>LinkWood</Link>
      </div>
      <div className="relative w-24 h-24  ">
        <Image
          src={session?.user?.image as string}
          alt="alt"
          fill
          className="rounded-full"
        />
      </div>
      <nav className="flex flex-col flex-1 gap-6 items-center  ">
        <Link
          href={"/account"}
          className={`flex gap-5 ${
            pathname === "/account" && "bg-blue-300"
          } px-5 py-3 rounded-xl items-center  text-xl`}
        >
          <FaCog />
          <span>Settings</span>
        </Link>
        <Link
          href={"/analytics"}
          className={`flex gap-5 ${
            pathname === "/analytics" && "bg-blue-300"
          } px-5 py-3 rounded-xl   items-center text-xl`}
        >
          <SiGoogleanalytics />
          <span>Analytics</span>
        </Link>
        <div className={` gap-5   px-5 py-3 rounded-xl items-center text-xl`}>
          <Logout />
        </div>
      </nav>
    </aside>
  );
};

export default Aside;
