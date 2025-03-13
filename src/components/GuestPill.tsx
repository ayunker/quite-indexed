import React from 'react';

interface GuestPillProps {
  guest: string;
  isSelected: boolean;
  onClick: (guest: string) => void;
}

const GuestPill: React.FC<GuestPillProps> = ({ guest, isSelected, onClick }) => {
  return (
    <button
      className={`pill ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(guest)}
    >
      {guest}
    </button>
  );
};

export default GuestPill;
