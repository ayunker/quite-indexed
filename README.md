# Quite Indexed

## Generating Data

`scripts/wikiScraper.ts` scrapes the data off of wikipedia and writes that to
`data/qi_episodes.json`. `scripts/indexer.tx` builds and writes the inverted
index to `data/qi_inverted_index.json`. All encapsulated in `just reload`.

## Deployment

Quite Indexed is deployed on [Render]. Render watches this repo on github and
will pull latest and build from source using `bun run build`. Nice and simple

[Render]: render.com
