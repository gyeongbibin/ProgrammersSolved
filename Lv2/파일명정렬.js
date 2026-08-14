function solution(files) {
    return files
        .map((file, index) => {
            const [, head, number] = file.match(/^(\D+)(\d{1,5})/);
            return {
                file,
                head: head.toLowerCase(),
                number: Number(number),
                index,
            };
        })
        .sort((a, b) => {
            if (a.head < b.head) return -1;
            if (a.head > b.head) return 1;
            if (a.number !== b.number) return a.number - b.number;
            return a.index - b.index;
        })
        .map(({ file }) => file);
}
