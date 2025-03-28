import { mutation } from "./_generated/server";

import { v } from "convex/values";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    //

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      throw new Error("User already exists");
    }

    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      imageUrl: args.imageUrl,
      clerkId: args.clerkId,
    });
  },
});
