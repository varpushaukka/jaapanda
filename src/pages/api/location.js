import { Octokit } from "@octokit/core";

process.env.NTBA_FIX_319 = "test";
const TelegramBot = require("node-telegram-bot-api");

const updateGist = (con) => {
  const octokit = new Octokit({
    auth: process.env.GIST_TOKEN,
  });

  octokit.request("PATCH /gists/f097ca1b5c5b8d8f7d76720c76fbf061", {
    gist_id: "f097ca1b5c5b8d8f7d76720c76fbf061",
    description: "An update to a gist",
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
    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message;

      const message = `Thanks for your message: *"${text}"*\nHave a great day!;`;

      await bot.sendMessage(id, message, { parse_mode: "Markdown" });
    }
  } catch (error) {
    console.error("Error sending message");
    console.log(error.toString());
  }
  // if (query.secret_token === process.env.BOT_WEBHOOK_TOKEN) updateGist(body);
  return res.send("ok");
}
