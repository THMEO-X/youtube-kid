const fs = require("fs");

module.exports = {
    button1: {
        label: "Nghe ngay",

        get url() {
            const lines = fs
                .readFileSync("url.js", "utf8")
                .split("\n")
                .filter(x => x.trim());

            return lines[0]
                .replace(/"/g, "")
                .trim();
        }
    },

    button2: {
        label: "DISCORD cua toii",
        url: "https://discord.gg/uVYCtHzrS5"
    }
};
