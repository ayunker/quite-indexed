import { useState, useMemo } from 'react';
import { Episode, GuestIndex } from '../types';

export const useEpisodeFilter = (
  episodes: Episode[],
  guestIndex: GuestIndex
) => {
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  // Get all unique guests from the index
  const allGuests = useMemo(() => {
    return Object.keys(guestIndex).sort();
  }, [guestIndex]);

  // Filter episodes based on selected guests
  const filteredEpisodes = useMemo(() => {
    if (selectedGuests.length === 0) {
      return episodes;
    }

    // Find common episodes that include all selected guests
    const episodeSets = selectedGuests.map(guest => new Set(guestIndex[guest]));
    const firstSet = episodeSets[0];
    
    let commonEpisodeIds: string[] = [...firstSet];
    
    for (let i = 1; i < episodeSets.length; i++) {
      commonEpisodeIds = commonEpisodeIds.filter(id => episodeSets[i].has(id));
    }

    // Return episodes that match the common episode IDs
    return episodes.filter(episode => commonEpisodeIds.includes(episode.episodeNumber));
  }, [episodes, guestIndex, selectedGuests]);

  const toggleGuest = (guest: string) => {
    setSelectedGuests(prev => {
      const isSelected = prev.includes(guest);
      
      if (isSelected) {
        // Remove guest if already selected
        return prev.filter(g => g !== guest);
      } else if (prev.length < 3) {
        // Add guest if less than 3 are selected
        return [...prev, guest];
      }
      
      // Replace the first selected guest if 3 are already selected
      return [guest, ...prev.slice(1)];
    });
  };

  return {
    allGuests,
    selectedGuests,
    filteredEpisodes,
    toggleGuest
  };
};
