import WebPush from "web-push";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const publicKey = "BGlCz0Um-UodUuJLv0rnxbC1MXsBHszx6ulEwGFZ66FJjSaLvV-nUp5r7yNRptB9XS7Hhd-NsNEy73hz8Dh_wZA";
const privateKey = "zVaFpYdvj6L3pb5rZuYgKUfjFmxesdBlbGOVB7CG2RQ";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey
    }
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);
    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Hello do Backend");
    }, 5000);
    
    return reply.status(201).send();
  });
}