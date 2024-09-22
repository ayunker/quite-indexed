reload:
	rm data/*.json
	bun run scripts/wikiscraper.ts
	bun run scripts/indexer.ts

scrape:
	rm data/qi_episodes.json
	bun run scripts/wikiscraper.ts
	nvim data/qi_episodes.json
