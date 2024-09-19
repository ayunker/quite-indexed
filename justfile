reload:
	rm data/*.json
	bun run scripts/wikiscraper.ts
	bun run scripts/indexer.ts
