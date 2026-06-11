const { RichPresence } = require("discord.js-selfbot-v13");
const chalk = require("chalk");
const fs = require("fs");
const cfg = require("./config");
const time = require("./time");
const Image = require("./image");
const buttons = require("./button");

function rpc(client, config) {
    if (!config.settings.discordrpc) return;

    const updateRPC = () => {
        const status = new RichPresence(client)
            .setApplicationId(cfg.APPLICATION_ID)
            .setType("LISTENING")
            .setName("Spotify")
            .setDetails("Tên bài hát")
            .setState("Tên nghệ sĩ")
            .setStartTimestamp(Date.now())
            .setEndTimestamp(Date.now() + time.duration)
            .setAssetsLargeImage(require("./image").largeImage)
            .setAssetsLargeText("Album / Spotify")
            .addButton(buttons.button1.label, buttons.button1.url)
            .addButton(buttons.button2.label, buttons.button2.url);

        client.user.setPresence({
            activities: [status],
        });

        console.log(
            chalk.green(`RPC updated | duration = ${time.duration}`)
        );
    };

    // chạy lần đầu
    updateRPC();

    // cập nhật khi timenev.js thay đổi
    fs.watch("./timenev.js", (eventType) => {
        if (eventType === "change") {
            delete require.cache[require.resolve("./time")];
            updateRPC();
        }
    });

    // cập nhật khi imdis.js thay đổi
    fs.watch("./imdis.js", (eventType) => {
        if (eventType === "change") {
            delete require.cache[require.resolve("./image")];
            updateRPC();
        }
    });

    // cập nhật khi button.js thay đổi
    fs.watch("./button.js", (eventType) => {
        if (eventType === "change") {
            delete require.cache[require.resolve("./button")];
            updateRPC();
        }
    });

    console.log(chalk.green("Spotify RPC watcher started"));
}

module.exports = rpc;
