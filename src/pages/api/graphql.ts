import Fastify, { HTTPMethods } from "fastify";
import helmet from "fastify-helmet";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { NextApiHandler } from "next";
import { join } from "path";

import { schema } from "../../schema";

const isProduction = process.env.NODE_ENV === "production";

const build = async () => {
  const app = Fastify();

  await app.register(helmet);
  await app.register(mercurius, {
    graphiql: isProduction ? false : "playground", // TODO: Playground is not usable
    path: "/api/graphql",
    schema,
  });

  mercuriusCodegen(app, {
    targetPath: join(process.cwd(), "node_modules/@pokernook/graphql/index.ts"),
    operationsGlob: "../../graphql/**/*.graphql",
    watchOptions: { enabled: !isProduction },
  });

  return app;
};

const apiHandler: NextApiHandler = async (req, res) => {
  const app = await build();
  const { body, headers, statusCode } = await app.inject({
    cookies: req.cookies,
    headers: req.headers,
    method: req.method as HTTPMethods,
    payload: req.body,
    query: req.query,
    url: req.url,
  });

  for (const key in headers) {
    const header = headers[key]!;
    res.setHeader(key, header);
  }

  res.status(statusCode).end(body);
};

export default apiHandler;
