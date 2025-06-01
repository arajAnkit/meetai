"use client";
// Global reusable components
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>TODO: Data table</div>;
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take few moments"
    />
  );
};
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Please try again later"
    />
  );
};
