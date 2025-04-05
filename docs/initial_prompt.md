Given a newly generated Vite project using typescript, build out the
scaffolding for a single page application to show which episodes of QI include
certain guests.

* The episodes will be stored in a json file similar to the example below
* there will also be an inverted index file similar to the example below to
make searching for episodes easier. Each key corresponds to a guest, and the
value array represents each episode they featured in.
* There should be a list of pills at the top of the page, one pill for each
guest.
* Below the pills should be a card for each episode. The card should contain
the episode number, title, and air date. This information will come from the
episode list json file.
* When a pill is selected, the episodes listed below should be filtered to only
include episodes in which the guest is featured.
* The user can select up to 3 guests, and if multiple guests are selected, only
episodes that feature all selected guests should be returned.
* Add some basic styling, keeping it minimal with a dark mode style theme.
* Use best practices and write clean, reusable code.
* Leverage the typescript type system, and create custom types or interfaces as
needed.
* If new dependencies need to be added that's fine, but let me know what needs
to be added.

the current package.json looks like this, with these dependencies installed:
``` json
{
  "name": "quite-indexed",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/bun": "^1.1.9",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "axios": "^1.7.7",
    "cheerio": "^1.0.0",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}
```

inverted index example json:
``` json
{
  "danny baker": [
    "a.1",
    "a.6",
    "g.15",
    "h.3",
    "h.9",
    "j.14",
    "k.9",
    "l.13",
    "p.1"
  ],
  "hugh laurie": [
    "a.1"
  ],
  "john sessions": [
    "a.1",
    "a.12",
    "b.9",
    "b.10",
    "c.4",
    "c.10",
    "d.6",
    "d.9",
    "f.11",
    "j.8"
  ],
}
```

Episode Json example:
``` json
[
  {
    "title": "Adam",
    "winner": "Danny Baker",
    "originalAirDate": "11 September 2003 (2003-09-11)",
    "guests": [
      "Danny Baker",
      "Hugh Laurie",
      "John Sessions"
    ],
    "numberInSeries": "1",
    "seriesName": "Series A",
    "episodeNumber": "A.1"
  },
  {
    "title": "Astronomy",
    "winner": "Rich Hall and Jeremy Hardy",
    "originalAirDate": "18 September 2003 (2003-09-18)",
    "guests": [
      "Bill Bailey",
      "Rich Hall",
      "Jeremy Hardy"
    ],
    "numberInSeries": "2",
    "seriesName": "Series A",
    "episodeNumber": "A.2"
  },
]
```
