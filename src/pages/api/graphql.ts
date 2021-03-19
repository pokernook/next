import Fastify from "fastify";
import helmet from "fastify-helmet";
import mercurius from "mercurius";

import { schema } from "../../schema";

const build = async () => {
  const app = Fastify();

  await app.register(helmet);
  await app.register(mercurius, {
    path: "/api/graphql",
    schema,
  });
};
