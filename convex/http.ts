import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

// 1. We need to make sure that the webhook event is coming from Clerk
// 2. If so, we will listen to the 'user.created' event
// 3. We will save the user to the database

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET enviromental variable");
    }

    // check headers
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occured - Missing svix headers", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: any;

    //verify webhook
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as any;
    } catch (e) {
      console.error("Error verifying webhook: ", e);
      return new Response("Error occured - Invalid svix signature", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const user = evt.data;
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      const email = email_addresses[0].email_address;
      const fullname = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          fullname,
          email,
          image: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });
      } catch (error) {
        console.error("Error creating user: ", error);
        return new Response("Error occured - Unable to create user", {
          status: 500,
        });
      }
    }

    return new Response("User created successfully", {
      status: 200,
    });
  }),
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
