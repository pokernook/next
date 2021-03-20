import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";

import { resolvers } from "./cache";

export const getClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  exchanges: [
    dedupExchange,
    cacheExchange({ resolvers }),
    ssrExchange,
    fetchExchange,
  ],
  fetchOptions: { credentials: "include" },
  url: "/api/graphql",
});
