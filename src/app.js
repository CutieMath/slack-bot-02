import { WebClient, LogLevel } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_TOKEN, {
  logLevel: LogLevel.DEBUG,
});

let usersStore = {};

async function createChannelAndSendMessage() {
  const userResult = await web.users.list();
  saveUsers(userResult.members);

  const conversationOpenResult = await web.conversations.open({
    users: "U044RJDU7DX",
  });

  await publishMessage(
    conversationOpenResult,
    conversationOpenResult.channel.id,
    "Test message"
  );
}
createChannelAndSendMessage();

async function publishMessage(results, id, text) {
  console.log("CHANNEL CREATION RESULTS: ", results);
  console.log("CHANNEL ID RECEIVED: ", id);
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await web.chat.postMessage({
      token: process.env.SLACK_TOKEN,
      channel: id,
      text: text,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const saveUsers = (usersArray) => {
  console.log("USERS: ", usersArray);
  let userId = "";
  usersArray.forEach((user) => {
    userId = user.id;
    usersStore[userId] = user;
  });
};
