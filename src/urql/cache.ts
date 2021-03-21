import { ResolverConfig, UpdatesConfig } from "@urql/exchange-graphcache";

import * as graphql from "../graphql/types";

export const resolvers: ResolverConfig = {
  User: {
    discriminator: (parent) =>
      `#${parent.discriminator?.toString().padStart(4, "0") || ""}`,
  },
};

export const updates: Partial<UpdatesConfig> = {
  Mutation: {
    userLogOut: (_result, _args, cache) => {
      cache.invalidate("Query", "me");
    },

    userDeleteAccount: (_result, _args, cache) => {
      cache.invalidate("Query", "me");
    },

    userStatusClear: (_result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          if (data?.me) {
            data.me.status = null;
          }
          return data;
        }
      );
    },
  },
};
