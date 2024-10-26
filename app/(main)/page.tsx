import { getPageStatus } from "@/actions/getPage";
import { auth } from "@/auth";
import UsernameForm from "@/components/forms/UsernameForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const page = await getPageStatus(session?.user?.id);

  if (session) {
    if (page) {
      // toast.error("no page");
      redirect("/account");
    }
  }
  return (
    <main className="  pt-32 ">
      <section className="">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold ">Your one link for everything</h1>
          <h2 className="text-slate-600 text-xl mt-6">
            Share your lilnks, social profile ,contact info and more on one page
          </h2>
        </div>
        <UsernameForm session={session} />
      </section>
    </main>
  );
}
