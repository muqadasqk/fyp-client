import { QueryClient } from "@tanstack/react-query";

// create a React Query client
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // cache data for 5 minutes
      refetchOnWindowFocus: false, // prevents unnecessary re-fetching
      retry: 2, // retry failed requests twice
    },
  },
});

export default client;
