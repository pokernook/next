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
    userLogIn: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          const castResult = result as graphql.LogInMutation;
          if (data) {
            data.me = castResult.userLogIn?.user || null;
          }
          return data;
        }
      );
    },

    userSignUp: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          const castResult = result as graphql.SignUpMutation;
          if (data) {
            data.me = castResult.userSignUp?.user || null;
          }
          return data;
        }
      );
    },

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
