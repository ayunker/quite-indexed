import React from 'react';
import { Episode } from '../types';
import EpisodeCard from './EpisodeCard';

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  if (episodes.length === 0) {
    return (
      <div className="no-results">
        No episodes found with the selected guests.
      </div>
    );
  }

  return (
    <>
      <h2>{episodes.length} Episodes to Choose From!</h2>
      <div className="episode-list">
        {episodes.map(episode => (
          <EpisodeCard key={episode.episodeNumber} episode={episode} />
        ))}
      </div>
    </>
  );
};

export default EpisodeList;
