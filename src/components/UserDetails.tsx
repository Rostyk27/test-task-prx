import React, { useMemo } from 'react';
import { User } from '../types';

interface UserDetailsProps {
  user: User;
  searchQuery: string;
}

const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === highlight.toLowerCase() ? (
        <span style={{ backgroundColor: '#e8bb49' }}>{part}</span>
      ) : (
        part
      )}
    </React.Fragment>
  ));
};

const UserDetails = ({ user, searchQuery }: UserDetailsProps) => {
  const highlightedName = useMemo(
    () => getHighlightedText(user.name, searchQuery),
    [user.name, searchQuery]
  );
  const highlightedUsername = useMemo(
    () => getHighlightedText(user.username, searchQuery),
    [user.username, searchQuery]
  );

  return (
    <>
      <h2>{highlightedName}</h2>
      <div className="mb-6 text-sm">
        <p>Username: {highlightedUsername}</p>
        <p>Email: {user.email}</p>
      </div>
    </>
  );
};

export default UserDetails;
