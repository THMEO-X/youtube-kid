const fs = require("fs");

function getDuration() {
    const lines = fs.readFileSync("./timenev.js", "utf8")
        .split(/\r?\n/);

    for (const line of lines) {
        const match = line.trim().match(/^"([^"]+)"$/);

        if (match) {
            try {
                return Function(`return ${match[1]}`)();
            } catch (err) {
                console.error("Lỗi xử lý thời gian:", err);
            }
        }
    }

    return 0;
}

module.exports = {
    get duration() {
        return getDuration();
    }
};
