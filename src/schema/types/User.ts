import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.createdAt();
    t.model.discriminator();
    t.model.email();
    t.model.emailVerified();
    t.model.friendships();
    t.model.friendRequestsReceived();
    t.model.friendRequestsSent();
    t.model.id();
    t.model.status();
    t.model.username();
  },
});
