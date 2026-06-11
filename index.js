require("dotenv").config();

const { Client } = require("discord.js-selfbot-v13");
const chalk = require("chalk");
const rpc = require("./presence");
const keepAlive = require("./keep_alive");
require("./webhook");

// các code khác của index.js
keepAlive();

const client = new Client();

const config = {
    settings: {
        discordrpc: process.env.DISCORD_RPC === "true",
    },
};

client.on("ready", () => {
    console.log(chalk.green(`Logged in as ${client.user.username}`));
    rpc(client, config);
});

/* ---------- Auto reconnect ---------- */
client.on("disconnect", () => {
    console.log(chalk.red("Disconnected. Reconnecting..."));
    client.login(process.env.DISCORD_TOKEN);
});

client.on("error", () => {
    console.log(chalk.red("Connection error. Reconnecting..."));
    client.login(process.env.DISCORD_TOKEN);
});

client.on("invalidated", () => {
    console.log(chalk.red("Session invalidated. Reconnecting..."));
    client.login(process.env.DISCORD_TOKEN);
});
/* ------------------------------------- */

client.login(process.env.TOKEN);
