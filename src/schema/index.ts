import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { allow, nexusShield } from "nexus-shield";
import { validatePlugin } from "nexus-validate";
import { join } from "path";

export const schema = makeSchema({
  outputs: {
    schema: true,
    typegen: join(
      __dirname,
      "../../node_modules/@types/nexus-typegen/index.d.ts"
    ),
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      paginationStrategy: "prisma",
    }),
    nexusShield({
      defaultError: new Error("Not authorized"),
      defaultRule: allow,
    }),
    validatePlugin(),
  ],
  sourceTypes: {
    modules: [
      {
        alias: "prisma",
        module: require.resolve(".prisma/client/index.d.ts"),
      },
    ],
  },
  types: null,
});
