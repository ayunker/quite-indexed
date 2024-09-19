interface Episode {
  title: string;
  winner: string;
  originalAirDate: string;
  guests: string[];
  numberInSeries: string;
  seriesName: string;
  episodeNumber: string;
}

//{
//  "Bill Bailey": ["A1", "B2"],
//  "Jo Brand": ["A2", "B3"],
//}

async function buildInvertedIndex() {
  const file = Bun.file("./data/qi_episodes.json");
  const qiData = JSON.parse(await file.text());

  const invertedIndex = {};

  qiData.forEach((episode: Episode) => {
    episode.guests.forEach(
      (guest) =>
      (invertedIndex[guest] = [
        ...(invertedIndex[guest] || []),
        episode.episodeNumber,
      ]),
    );
  });

  Bun.write(
    "./data/qi_inverted_index.json",
    JSON.stringify(invertedIndex, null, 2),
  );
}

buildInvertedIndex();
