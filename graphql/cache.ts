import { ResolverConfig } from "@urql/exchange-graphcache";

export const resolvers: ResolverConfig = {
  User: {
    discriminator: (parent) =>
      `#${parent.discriminator?.toString().padStart(4, "0") || ""}`,
  },
};
