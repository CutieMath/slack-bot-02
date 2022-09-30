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
    usersStore["U044RJDU7DX"]
  );
}
createChannelAndSendMessage();

async function publishMessage(results, id, userName) {
  console.log("CONVERSATION OPEN RESULTS: ", results);
  console.log("CHANNEL ID RECEIVED: ", id);
  console.log("USER NAME RECEIVED: ", userName);
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await web.chat.postMessage({
      token: process.env.SLACK_TOKEN,
      channel: id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hello, *${userName}*, your direct nudge is here!`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: " \n\n *Nudge:* \n\nA bunch of texts. ",
          },
        },
        {
          type: "divider",
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Yes I do",
                emoji: true,
              },
              value: "click_me_123",
              url: "https://google.com",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Skip for now",
                emoji: true,
              },
              value: "click_me_123",
              url: "https://google.com",
            },
          ],
        },
      ],
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const saveUsers = (usersArray) => {
  // console.log("USERS: ", usersArray);
  let userId = "";
  usersArray.forEach((user) => {
    userId = user.id;
    usersStore[userId] = user.name;
  });
  console.log("USERS STORE: ", usersStore);
};
