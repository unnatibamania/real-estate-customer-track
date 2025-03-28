"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)({
        username: values_1.v.string(),
        fullname: values_1.v.string(),
        email: values_1.v.string(),
        imageUrl: values_1.v.string(),
        clerkId: values_1.v.string(),
    }).index("by_clerk_id", ["clerkId"]),
});
