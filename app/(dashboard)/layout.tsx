import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Aside from "@/components/Aside";
import { redirect } from "next/navigation";
import { getPage } from "@/actions/getPage";
import { auth } from "@/auth";
// import { Toaster } from "@/components/ui/toaster";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  const page = await getPage(session?.user?.id);

  if (!page) {
    // toast.error("no page");
    redirect("/");
  }
  const parsedPage = JSON.parse(JSON.stringify(page));
  return (
    <html lang="en">
      <body className=" min-h-screen bg-gray-300 ">
        <Toaster />
        <SessionProvider>
          <main className="  flex gap-5 items-start  ">
            <Aside page={parsedPage} />

            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
