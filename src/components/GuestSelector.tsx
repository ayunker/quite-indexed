import React from 'react';
import GuestPill from './GuestPill';

interface GuestSelectorProps {
  guests: string[];
  selectedGuests: string[];
  onToggle: (guest: string) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  guests,
  selectedGuests,
  onToggle
}) => {
  return (
    <div className="guest-selector">
      {guests.map(guest => (
        <GuestPill
          key={guest}
          guest={guest}
          isSelected={selectedGuests.includes(guest)}
          onClick={onToggle}
        />
      ))}
    </div>
  );
};

export default GuestSelector;
