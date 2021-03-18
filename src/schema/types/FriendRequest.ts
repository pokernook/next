import { objectType } from "nexus";

export const FriendRequest = objectType({
  name: "FriendRequest",
  definition(t) {
    t.model.createdAt();
    t.model.from();
    t.model.id();
    t.model.status();
    t.model.to();
    t.model.updatedAt();
  },
});
