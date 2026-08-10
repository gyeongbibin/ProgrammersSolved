function solution(genres, plays) {
    const genreMap = new Map();

    for (let index = 0; index < genres.length; index++) {
        const genre = genres[index];

        if (!genreMap.has(genre)) {
            genreMap.set(genre, { total: 0, firstIndex: index, songs: [] });
        }

        const data = genreMap.get(genre);
        data.total += plays[index];
        data.songs.push({ index, plays: plays[index] });
    }

    return [...genreMap.values()]
        .sort((a, b) => b.total - a.total || a.firstIndex - b.firstIndex)
        .flatMap(data => data.songs
            .sort((a, b) => b.plays - a.plays || a.index - b.index)
            .slice(0, 2)
            .map(song => song.index));
}
