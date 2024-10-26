import { getPage } from "@/actions/getPage";
import { auth } from "@/auth";
import ViewsCharts from "@/components/charts/ViewsCharts";
import Event from "@/models/Event.model";
import { redirect } from "next/navigation";
import React from "react";

const analytics = async () => {
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
  const groupedView = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: parsedPage.uri,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d",
            },
          },
          count: {
            $count: {},
          },
        },
      },
    ],
    { $order: "-$id" }
  );

  return (
    <div className="bg-blue-100 p-5  rounded-xl m-3">
      <ViewsCharts data={groupedView} />
    </div>
  );
};

export default analytics;
