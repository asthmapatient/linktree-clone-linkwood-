import { getPageByUri } from "@/actions/getPage";
import HandlersButtons from "@/components/buttons/HandlersButtons";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaLocationPinLock } from "react-icons/fa6";
import image from "@/public/image.png";
import Link from "next/link";
import Event from "@/models/Event.model";
export const revalidate = 5; // ISR: page is revalidated every 60 seconds

const page = async ({ params }: any) => {
  const page = await getPageByUri(params.name);

  if (!page) {
    redirect("/");
  }
  const parsedPage = JSON.parse(JSON.stringify(page));

  await Event.create({
    uri: params?.name,
    type: "view",
  });

  return (
    <main className={` h-full`}>
      <div
        className="w-full h-1/4"
        style={
          page.bgType === "color"
            ? {
                backgroundColor: `${page?.bgColor}`,
              }
            : {
                backgroundImage: `url(${page?.bgImageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
        }
      ></div>
      <div className="max-w-4xl mx-auto ">
        <div className="relative w-32 h-32 mx-auto -mt-16">
          <Image
            src={
              page?.pfpImageUrl ||
              `https://avatar.iran.liara.run/username?username=${page?.displayname}`
            }
            alt="alt"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col mt-5 gap-2 items-center text-white justify-center">
          <h1 className="text-2xl font-semibold capitalize">
            {page?.displayname}
          </h1>
          <h2 className=" flex items-center gap-2 text-lg">
            <FaLocationPinLock />
            <span>{page.address}</span>
          </h2>
          <h2 className="text-xl">{page.bio}</h2>
          <HandlersButtons page={parsedPage} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-7">
          {page?.links.map((link: any) => {
            return (
              <Link
                key={link.key}
                ping={`${process.env.PUBLIC_URL}/api/click?url=${btoa(
                  link.url
                )}`}
                href={
                  link?.url.startsWith("http://") ||
                  link?.url.startsWith("https://")
                    ? link?.url
                    : `http://${link?.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-300 p-3 flex items-center gap-5  col-span-1 w-full"
              >
                <div className="relative -ml-8 w-24 h-24">
                  <Image alt="imge" fill src={link.icon || image} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-white">
                    {link.title}
                  </h2>
                  <p className="text-lg text-cyan-200">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
