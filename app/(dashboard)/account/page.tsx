import { getPage } from "@/actions/getPage";
import { auth } from "@/auth";
import CustomButtonsForm from "@/components/forms/CustomButtonsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import { redirect } from "next/navigation";

const page = async () => {
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
    <div className="  flex flex-col gap-10    m-3 w-full  rounded-xl  ">
      <PageSettingsForm page={parsedPage} session={session} />

      <PageButtonsForm page={parsedPage} session={session} />

      <CustomButtonsForm page={parsedPage} session={session} />
    </div>
  );
};

export default page;
