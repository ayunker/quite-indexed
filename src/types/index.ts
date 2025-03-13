export interface Episode {
  title: string;
  winner: string;
  originalAirDate: string;
  guests: string[];
  numberInSeries: string;
  seriesName: string;
  episodeNumber: string;
}

export interface GuestIndex {
  [guest: string]: string[];
}

export type SelectedGuests = string[];
