import { RTMClient } from "@slack/rtm-api";

const rtm = new RTMClient(process.env.SLACK_TOKEN);
rtm.start().catch(console.error);

rtm.on("ready", async () => {
  console.log("Girl I'm LIT");
});
