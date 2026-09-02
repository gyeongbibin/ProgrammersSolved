function solution(coin, cards) {
    const cardCount = cards.length;
    const target = cardCount + 1;
    const initialCount = cardCount / 3;
    const hand = new Set(cards.slice(0, initialCount));
    const candidates = new Set();
    let round = 1;

    function usePair(firstSet, secondSet) {
        for (const card of firstSet) {
            const complement = target - card;
            if (!secondSet.has(complement)) continue;

            firstSet.delete(card);
            secondSet.delete(complement);
            return true;
        }
        return false;
    }

    for (let index = initialCount; index < cardCount; index += 2) {
        candidates.add(cards[index]);
        candidates.add(cards[index + 1]);

        if (usePair(hand, hand)) {
            round++;
            continue;
        }
        if (coin >= 1 && usePair(hand, candidates)) {
            coin--;
            round++;
            continue;
        }
        if (coin >= 2 && usePair(candidates, candidates)) {
            coin -= 2;
            round++;
            continue;
        }

        break;
    }

    return round;
}
