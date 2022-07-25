import { Octokit } from "@octokit/core";

process.env.NTBA_FIX_319 = "test";
const TelegramBot = require("node-telegram-bot-api");

const updateGist = (isOpen, location, token) => {
  const content = { open: isOpen, lat: location[0], lon: location[1] };
  if (token === process.env.BOT_WEBHOOK_TOKEN) {
    updateGistCall(JSON.stringify(content));
  }
};

const updateGistCall = (con) => {
  const octokit = new Octokit({
    auth: process.env.GIST_TOKEN,
  });

  octokit.request("PATCH /gists/f097ca1b5c5b8d8f7d76720c76fbf061", {
    gist_id: "f097ca1b5c5b8d8f7d76720c76fbf061",
    description: "Bot update to status",
    files: {
      "jaapanda.json": {
        content: con,
      },
    },
  });
};

export default async function handler(req, res) {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
    const { body, query } = req;
    if (body.message.text) {
      const {
        chat: { id },
        text,
      } = body.message;
      if (text.toLowerCase() === "kiinni") {
        updateGist(false, [60.23165, 25.03632], query.secret_token);
        const message = `[Jääpanda](https://xn--jpanda-buaa.fi/) on nyt kiinni. Lähetä sijainti avataksesi sen uudelleen.`;
        await bot.sendMessage(id, message, { parse_mode: "Markdown" });
      }
    } else if (body.message.location) {
      const {
        chat: { id },
        location,
      } = body.message;
      const message = `sijaintisi on *"${
        location.longitude + ", " + location.latitude
      }"*Jääpanda on nyt auki!`;
      updateGist(
        true,
        [location.latitude, location.longitude],
        query.secret_token
      );
      await bot.sendMessage(id, message, { parse_mode: "Markdown" });
    }
  } catch (error) {
    console.error("Error sending message");
    console.log(error.toString());
  }
  return res.send("ok");
}
