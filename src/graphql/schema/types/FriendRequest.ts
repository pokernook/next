import {
  enumType,
  intArg,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { FriendRequest, FriendRequestStatus } from "nexus-prisma";

import { isAuthenticated } from "../rules";

export const FriendRequestStatusEnum = enumType(FriendRequestStatus);

export const FriendRequestObject = objectType({
  name: FriendRequest.$name,
  definition(t) {
    t.field(FriendRequest.createdAt.name, {
      type: FriendRequest.createdAt.type,
    });
    t.field("from", {
      type: "User",
      resolve: (parent, _args, ctx) =>
        ctx.prisma.friendRequest
          .findUnique({ where: { id: parent.id } })
          .from(),
    });
    t.field(FriendRequest.id.name, { type: FriendRequest.id.type });
    t.field(FriendRequest.status.name, { type: FriendRequest.status.type });
    t.field("to", {
      type: "User",
      resolve: (parent, _args, ctx) =>
        ctx.prisma.friendRequest.findUnique({ where: { id: parent.id } }).to(),
    });
    t.field(FriendRequest.updatedAt.name, {
      type: FriendRequest.updatedAt.type,
    });
  },
});

export const friendRequestSend = mutationField("friendRequestSend", {
  type: "FriendRequest",
  shield: isAuthenticated(),
  args: {
    username: nonNull(stringArg()),
    discriminator: nonNull(intArg()),
  },
  resolve: async (_root, { username, discriminator }, ctx) => {
    if (!ctx.user) {
      return null;
    }
    const to = await ctx.prisma.user.findUnique({
      where: { Tag: { username, discriminator } },
      rejectOnNotFound: true,
    });
    if (ctx.user.id === to.id) {
      throw new Error("You can't friend yourself");
    }
    const friendRequest = await ctx.prisma.friendRequest.create({
      data: {
        from: {
          connect: { id: ctx.user.id },
        },
        to: {
          connect: { id: to.id },
        },
      },
    });
    return friendRequest;
  },
});

export const friendRequestAccept = mutationField("friendRequestAccept", {
  type: "FriendRequest",
  shield: isAuthenticated(),
  args: { friendRequestId: nonNull(stringArg()) },
  resolve: async (_root, { friendRequestId }, ctx) => {
    if (!ctx.user) {
      return null;
    }
    const friendRequest = await ctx.prisma.friendRequest.findUnique({
      where: { id: friendRequestId },
      rejectOnNotFound: true,
    });
    if (friendRequest.toId !== ctx.user.id) {
      throw new Error("Could not accept friend request");
    } else if (friendRequest.status === "ACCEPTED") {
      return friendRequest;
    }
    const [acceptedFriendRequest] = await ctx.prisma.$transaction([
      ctx.prisma.friendRequest.update({
        where: { id: friendRequestId },
        data: { status: "ACCEPTED" },
      }),
      ctx.prisma.friendship.create({
        data: {
          users: {
            connect: [{ id: friendRequest.fromId }, { id: friendRequest.toId }],
          },
        },
      }),
    ]);
    return acceptedFriendRequest;
  },
});

export const friendRequestReject = mutationField("friendRequestReject", {
  type: "FriendRequest",
  shield: isAuthenticated(),
  args: { friendRequestId: nonNull(stringArg()) },
  resolve: async (_root, { friendRequestId }, ctx) => {
    if (!ctx.user) {
      return null;
    }
    const friendRequest = await ctx.prisma.friendRequest.findUnique({
      where: { id: friendRequestId },
      rejectOnNotFound: true,
    });
    if (friendRequest.toId !== ctx.user.id) {
      throw new Error("Cannot reject a friend request that wasn't sent to you");
    }
    if (friendRequest.status === "ACCEPTED") {
      throw new Error("Cannot reject an accepted friend request");
    }
    const rejectedFriendRequest = ctx.prisma.friendRequest.update({
      where: { id: friendRequestId },
      data: { status: "REJECTED" },
    });
    return rejectedFriendRequest;
  },
});

export const friendRequestCancel = mutationField("friendRequestCancel", {
  type: "FriendRequest",
  shield: isAuthenticated(),
  args: { friendRequestId: nonNull(stringArg()) },
  resolve: async (_root, { friendRequestId }, ctx) => {
    if (!ctx.user) {
      return null;
    }
    const friendRequest = await ctx.prisma.friendRequest.findUnique({
      where: { id: friendRequestId },
      rejectOnNotFound: true,
    });
    if (friendRequest.fromId !== ctx.user.id) {
      throw new Error("Cannot cancel a friend request you didn't send");
    }
    if (friendRequest.status != "PENDING") {
      throw new Error(
        "Cannot cancel a friend request that has been updated by the recipient"
      );
    }
    const cancelledFriendRequest = ctx.prisma.friendRequest.update({
      where: { id: friendRequestId },
      data: { status: "CANCELLED" },
    });
    return cancelledFriendRequest;
  },
});
