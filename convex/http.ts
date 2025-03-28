import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";

import { api } from "./_generated/api";
const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webHookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not set");
    }

    const svix_id = req.headers.get("svix-id");
    const svix_signature = req.headers.get("svix-signature");
    const svix_timestamp = req.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: any;

    const wh = new Webhook(webHookSecret);
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as any;
    } catch (error) {
      console.error(error);
      return new Response("Invalid signature", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name} ${last_name}`.trim();

      console.log(email, name, image_url, id);

      try {
        await ctx.runMutation(api.user.createUser, {
          email,
          fullname: name,
          imageUrl: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });

        console.log("User created");
      } catch (error) {
        console.error(error);
        return new Response("Failed to create user", { status: 500 });
      }
    }

    console.log("End of webhook");

    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;
