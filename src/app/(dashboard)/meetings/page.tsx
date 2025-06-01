import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";

import { loadSearchParams } from "@/modules/meetings/params";

import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetings-view";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
