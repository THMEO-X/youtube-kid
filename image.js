const fs = require("fs");

let largeImage = "";

try {

    if (fs.existsSync("imdis.js")) {

        const lines = fs
            .readFileSync("imdis.js", "utf8")
            .split("\n")
            .filter(x => x.trim());

        if (lines.length) {

            largeImage = lines[0]
                .replace(/"/g, "")
                .trim();

        }
    }

} catch (err) {
    console.error(err);
}

module.exports = {
    get largeImage() {

        try {

            if (!fs.existsSync("imdis.js")) {
                return "";
            }

            const lines = fs
                .readFileSync("imdis.js", "utf8")
                .split("\n")
                .filter(x => x.trim());

            if (!lines.length) {
                return "";
            }

            return lines[0]
                .replace(/"/g, "")
                .trim();

        } catch {

            return "";

        }
    }
};
