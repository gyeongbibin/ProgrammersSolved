function solution(numbers) {
    return numbers.map((number) => {
        let binary = number.toString(2);
        let fullLength = 1;
        while (fullLength < binary.length) fullLength = fullLength * 2 + 1;
        binary = binary.padStart(fullLength, "0");

        function isValid(start, end, parentIsDummy) {
            if (start > end) return true;

            const middle = Math.floor((start + end) / 2);
            const isNode = binary[middle] === "1";
            if (parentIsDummy && isNode) return false;

            const currentIsDummy = parentIsDummy || !isNode;
            return isValid(start, middle - 1, currentIsDummy)
                && isValid(middle + 1, end, currentIsDummy);
        }

        return isValid(0, binary.length - 1, false) ? 1 : 0;
    });
}
