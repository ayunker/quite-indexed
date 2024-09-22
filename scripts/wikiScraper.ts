import axios from "axios";
import * as cheerio from "cheerio";

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

function cleanText(s: string) {
  return s
    .replace(/"/g, "")
    .replace(/\[fn \d+\]/, "")
    .trim();
}

function cleanTitle(title: string) {
  if (title.includes(".mw-parser-output")) {
    return "Everything, Etc.";
  }

  return cleanText(title);
}

function seriesLetterFor(title: string) {
  if (title.startsWith("The ")) return title.at(4);
  const [first, second] = title;
  return /[a-zA-Z]/.test(first) ? first : second;
}

async function fetchEpisodes() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const episodes: Episode[] = [];

  $(".wikiepisodetable")
    .slice(1)
    .each((_, table) => {
      $(table)
        .find("tr")
        .each((_, row) => {
          const columns = $(row).find("td");
          if (columns.length === 0) return; // skip headers
          // if (seriesIndex >= 1) return; // testing

          const numberInSeries = $(columns[0]).text().trim();
          if (numberInSeries === "N/A") return; // skip specials

          const title = cleanTitle($(columns[1]).text());
          if (title.startsWith("QI VG")) return; // skip VG episodes

          const seriesLetter = seriesLetterFor(title);
          const seriesName = `Series ${seriesLetter}`;
          const episodeNumber = [seriesLetter, numberInSeries].join(".");

          const episode: Episode = {
            title: title,
            winner: $(columns[3]).text().trim(),
            originalAirDate: $(columns[4]).text().trim(),
            guests: $(columns[2])
              .text()
              .trim()
              .split("\n")
              .map((g) => cleanText(g)),
            numberInSeries: numberInSeries,
            seriesName: seriesName,
            episodeNumber: episodeNumber,
          };

          episodes.push(episode);
        });
    });

  Bun.write("./data/qi_episodes.json", JSON.stringify(episodes, null, 2));
  console.log("Data extracted to data/qi_episodes.json");
}

fetchEpisodes().catch(console.error);
