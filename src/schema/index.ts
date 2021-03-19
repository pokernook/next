import { makeSchema } from "nexus";
import { allow, nexusShield } from "nexus-shield";
import { validatePlugin } from "nexus-validate";
import { join } from "path";

import * as types from "./types";

// TODO: Context type is not available
export const schema = makeSchema({
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
    validatePlugin(),
  ],
  types,
});
