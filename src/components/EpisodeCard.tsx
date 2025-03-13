import React from 'react';
import { Episode } from '../types';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  // Format the air date to be more readable
  // TODO: we can make this better. parenthetical part is already ISO8601
  const formatAirDate = (dateString: string) => {
    try {
      // Extract the date part from the string (before the parentheses)
      const datePart = dateString.split('(')[0].trim();

      // Try to create a date object and format it
      const date = new Date(datePart);

      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }

      // If parsing fails, return the original date string
      return datePart;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="episode-card">
      <div className="episode-number">
        {episode.seriesName} - Episode {episode.numberInSeries} ({episode.episodeNumber})
      </div>
      <h3>{episode.title}</h3>
      <div className="air-date">
        Aired: {formatAirDate(episode.originalAirDate)}
      </div>
      <div className="guests">
        <strong>Guests:</strong> {episode.guests.join(', ')}
      </div>
    </div>
  );
};

export default EpisodeCard;
