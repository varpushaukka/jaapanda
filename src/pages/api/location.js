import { Octokit } from "@octokit/core";

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
  const { message, query } = req;
  if (query.secret_token === process.env.BOT_WEBHOOK_TOKEN) updateGist(message);
  return res.send("ok");
}
