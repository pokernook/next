import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";

export const getClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  exchanges: [dedupExchange, cacheExchange(), ssrExchange, fetchExchange],
  fetchOptions: { credentials: "include" },
  url: "/api/graphql",
});
