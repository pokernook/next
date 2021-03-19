import { mutationField, nonNull, objectType, stringArg } from "nexus";
import { Friendship } from "nexus-prisma";

import { isAuthenticated } from "../rules";
import { User } from "./User";

export const FriendshipObject = objectType({
  name: Friendship.$name,
  definition(t) {
    t.field(Friendship.createdAt.name, { type: Friendship.createdAt.type });
    t.field(Friendship.id.name, { type: Friendship.id.type });
    t.nonNull.list.nonNull.field("users", {
      type: User,
      resolve: () => null, // TODO: implement users resolver
    });
  },
});

export const friendshipDelete = mutationField("friendshipDelete", {
  type: FriendshipObject,
  shield: isAuthenticated(),
  args: { friendshipId: nonNull(stringArg()) },
  resolve: async (_root, { friendshipId }, ctx) => {
    if (!ctx.user) {
      return null;
    }
    await ctx.prisma.friendship.findFirst({
      where: {
        id: friendshipId,
        users: { some: { id: ctx.user.id } },
      },
      rejectOnNotFound: true,
    });
    const deletedFriendship = await ctx.prisma.friendship.delete({
      where: { id: friendshipId },
    });
    return deletedFriendship;
  },
});
