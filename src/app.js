import { RTMClient } from "@slack/rtm-api";
import { WebClient } from "@slack/web-api";

const rtm = new RTMClient(process.env.SLACK_TOKEN);
const web = new WebClient(process.env.SLACK_TOKEN);
rtm.start().catch(console.error);

rtm.on("ready", async () => {
  console.log("Girl I'm LIT");
  sendMessage("#general", "Girl I'm online ye");
});

async function sendMessage(channel, message) {
  await web.chat.postMessage({
    channel: channel,
    text: message,
  });
}
