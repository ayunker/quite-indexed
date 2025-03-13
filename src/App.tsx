import React, { useState, useEffect } from 'react';
import './styles/index.css';
import { Episode, GuestIndex } from './types';
import GuestSelector from './components/GuestSelector';
import EpisodeList from './components/EpisodeList';
import { useEpisodeFilter } from './hooks/useEpisodeFilter';

// Import the data statically at build time
import episodesData from '../data/qi_episodes.json';
import guestIndexData from '../data/qi_inverted_index.json';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [guestIndex, setGuestIndex] = useState<GuestIndex>({});

  // Use async effect to mimic fetching data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real application, you might fetch this data from an API
        // but for this example we're importing it directly
        setEpisodes(episodesData);
        setGuestIndex(guestIndexData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const { allGuests, selectedGuests, filteredEpisodes, toggleGuest } = useEpisodeFilter(episodes, guestIndex);

  if (isLoading) {
    return <div className="container"><p>Loading episodes...</p></div>;
  }

  return (
    <div className="container">
      <h1>QI Episode Finder</h1>

      <div>
        <p style={{ textAlign: 'center', marginBottom: '16px' }}>
          Select up to 3 guests to filter episodes
          {selectedGuests.length > 0 && ` (${selectedGuests.length}/3 selected)`}
        </p>
        <GuestSelector
          guests={allGuests}
          selectedGuests={selectedGuests}
          onToggle={toggleGuest}
        />
      </div>

      <EpisodeList episodes={filteredEpisodes} />
    </div>
  );
};

export default App;
