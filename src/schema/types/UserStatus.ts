import { arg, mutationField, objectType, stringArg } from "nexus";
import { UserStatus } from "nexus-prisma";

import { isAuthenticated } from "../rules";

export const UserStatusObject = objectType({
  name: UserStatus.$name,
  definition(t) {
    t.field(UserStatus.createdAt.name, { type: UserStatus.createdAt.type });
    t.field(UserStatus.emoji.name, { type: UserStatus.emoji.type });
    t.field(UserStatus.id.name, { type: UserStatus.id.type });
    t.field(UserStatus.message.name, { type: UserStatus.message.type });
    t.field(UserStatus.updatedAt.name, { type: UserStatus.updatedAt.type });
    t.nonNull.field("user", {
      type: "User",
      resolve: () => null, // TODO: implement user resolver
    });
  },
});

export const userStatusSet = mutationField("userStatusSet", {
  type: "UserStatus",
  shield: isAuthenticated(),
  args: {
    emoji: arg({ type: "EmojiSingular" }),
    message: stringArg(),
  },
  validate: ({ string }) => ({
    message: string().max(80),
  }),
  resolve: async (_root, { emoji, message }, ctx) => {
    const { status } = await ctx.prisma.user.update({
      where: { id: ctx.user?.id },
      select: { status: true },
      data: {
        status: {
          upsert: {
            create: { emoji, message },
            update: { emoji, message },
          },
        },
      },
    });
    return status;
  },
});

export const userStatusClear = mutationField("userStatusClear", {
  type: "UserStatus",
  shield: isAuthenticated(),
  resolve: async (_root, _args, ctx) => {
    const userWithStatus = await ctx.prisma.user.findUnique({
      where: { id: ctx.user?.id },
      include: { status: true },
      rejectOnNotFound: true,
    });
    if (!userWithStatus.status) {
      return null;
    }
    return await ctx.prisma.userStatus.delete({
      where: { id: userWithStatus.status.id },
    });
  },
});
