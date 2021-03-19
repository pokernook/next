import Fastify, { HTTPMethods } from "fastify";
import cookie from "fastify-cookie";
import helmet from "fastify-helmet";
import redis from "fastify-redis";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { NextApiHandler } from "next";
import { join } from "path";

import { buildContext } from "../../graphql/context";
import { schema } from "../../graphql/schema";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const REDIS_URL = process.env.REDIS_URL || "";

const build = async () => {
  const app = Fastify();

  await app.register(helmet);
  await app.register(cookie);
  await app.register(redis, { url: REDIS_URL });
  await app.register(mercurius, {
    context: buildContext,
    graphiql: IS_PRODUCTION ? false : "playground", // TODO: Playground is not usable
    path: "/api/graphql",
    schema,
  });
  await mercuriusCodegen(app, {
    targetPath: join(process.cwd(), "node_modules/@pokernook/graphql/index.ts"),
    operationsGlob: "../../graphql/operations/**/*.graphql",
    watchOptions: { enabled: !IS_PRODUCTION },
  });

  return app;
};

const apiHandler: NextApiHandler = async (req, res) => {
  const app = await build();
  const { body, headers, statusCode } = await app.inject({
    cookies: req.cookies,
    headers: req.headers,
    method: req.method as HTTPMethods,
    payload: req.body as string,
    query: req.query,
    url: req.url,
  });

  for (const key in headers) {
    const header = headers[key];
    if (header) {
      res.setHeader(key, header);
    }
  }

  res.status(statusCode).end(body);
};

export default apiHandler;
