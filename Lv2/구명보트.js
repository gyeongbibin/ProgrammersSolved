function solution(people, limit) {
    people.sort((a, b) => a - b);

    let light = 0;
    let heavy = people.length - 1;
    let boats = 0;

    while (light <= heavy) {
        if (people[light] + people[heavy] <= limit) light += 1;
        heavy -= 1;
        boats += 1;
    }

    return boats;
}
