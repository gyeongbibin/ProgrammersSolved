function solution(s) {
    return s.map((binary) => {
        const remaining = [];
        let extracted = 0;

        for (const bit of binary) {
            if (
                bit === "0"
                && remaining[remaining.length - 1] === "1"
                && remaining[remaining.length - 2] === "1"
            ) {
                remaining.pop();
                remaining.pop();
                extracted += 1;
            } else {
                remaining.push(bit);
            }
        }

        let insertion = remaining.length;
        while (insertion > 0 && remaining[insertion - 1] === "1") insertion -= 1;

        return remaining.slice(0, insertion).join("")
            + "110".repeat(extracted)
            + remaining.slice(insertion).join("");
    });
}
