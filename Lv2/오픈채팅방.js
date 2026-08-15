function solution(record) {
    const nicknames = new Map();
    const events = [];

    for (const entry of record) {
        const [command, userId, nickname] = entry.split(" ");

        if (command === "Enter" || command === "Change") {
            nicknames.set(userId, nickname);
        }
        if (command === "Enter" || command === "Leave") {
            events.push([command, userId]);
        }
    }

    return events.map(([command, userId]) => {
        const action = command === "Enter" ? "들어왔습니다." : "나갔습니다.";
        return `${nicknames.get(userId)}님이 ${action}`;
    });
}
