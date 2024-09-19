import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const url = "https://en.wikipedia.org/wiki/List_of_QI_episodes";

interface Episode {
  title: string;
  winner: string;
  originalAirDate: string;
  guests: string[];
  numberInSeries: string;
  seriesName: string;
  episodeNumber: string;
}

async function fetchEpisodes() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const episodes: Episode[] = [];

  $(".wikiepisodetable")
    .slice(1)
    .each((seriesIndex, table) => {
      const seriesLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(seriesIndex);
      const seriesName = `Series ${seriesLetter}`;

      $(table)
        .find("tr")
        .each((_, row) => {
          const columns = $(row).find("td");
          if (columns.length === 0) return; // skip headers
          // if (seriesIndex >= 1) return; // testing

          const numberInSeries = $(columns[0]).text().trim();
          const episodeNumber = [seriesLetter, numberInSeries].join(".");

          if (numberInSeries === "N/A") return; // skip headers

          const episode: Episode = {
            title: $(columns[1]).text().trim(),
            winner: $(columns[3]).text().trim(),
            originalAirDate: $(columns[4]).text().trim(),
            guests: $(columns[2])
              .text()
              .trim()
              .split("\n")
              .map((g) => g.trim()),
            numberInSeries: numberInSeries,
            seriesName: seriesName,
            episodeNumber: episodeNumber,
          };

          episodes.push(episode);
        });
    });

  fs.writeFileSync(
    "./data/qi_episodes.json",
    JSON.stringify(episodes, null, 2),
  );
  console.log("Data extracted to data/qi_episodes.json");
}

fetchEpisodes().catch(console.error);
