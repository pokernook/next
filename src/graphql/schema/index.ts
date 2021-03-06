import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { allow, nexusShield } from "nexus-shield";
import { validatePlugin } from "nexus-validate";
import { join } from "path";

import * as types from "./types";

export const schema = makeSchema({
  contextType: {
    export: "Context",
    module: join(process.cwd(), "src/graphql/context.ts"),
  },
  outputs: {
    schema: true,
    typegen: join(
      process.cwd(),
      "node_modules/@types/nexus-typegen/index.d.ts"
    ),
  },
  plugins: [
    nexusShield({
      defaultError: new Error("Not authorized"),
      defaultRule: allow,
    }),
    nexusPrisma({ paginationStrategy: "prisma" }),
    validatePlugin(),
  ],
  types,
});
