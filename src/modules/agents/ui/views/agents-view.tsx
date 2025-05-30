"use client";
// Reusable components
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );
  if (isLoading) {
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take few moments"
      />
    );
  }
  if (isError) {
    <ErrorState
      title="Error Loading Agents"
      description="Please try agailater"
    />;
  }
  return <div>{JSON.stringify(data, null, 2)}</div>;
};
