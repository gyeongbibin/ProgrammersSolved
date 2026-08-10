function solution(phoneBook) {
    phoneBook.sort();

    for (let index = 0; index < phoneBook.length - 1; index++) {
        if (phoneBook[index + 1].startsWith(phoneBook[index])) return false;
    }

    return true;
}
