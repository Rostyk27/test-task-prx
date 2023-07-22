import axios from 'axios';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { User } from '../types';

import UserDetails from './UserDetails';
import UserPostsAndAlbums from './UserPostsAndAlbums';

interface UsersTreeProps {
  searchQuery: string;
  sortOption: string;
}

const fetchUsers = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
};

const sortUsers = (users: User[], sortOption: string) => {
  switch (sortOption) {
    case 'name-asc':
      return [...users].sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return [...users].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return users;
  }
};

const UsersTree = ({ searchQuery, sortOption }: UsersTreeProps) => {
  const { data: users, isLoading } = useQuery<User[]>('users', fetchUsers);

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let userItems = [...users];

    if (searchQuery) {
      userItems = userItems.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption) {
      userItems = sortUsers(userItems, sortOption);
    }

    return userItems;
  }, [users, searchQuery, sortOption]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 pb-4 md:grid-cols-2">
      {filteredAndSortedUsers?.length ? (
        filteredAndSortedUsers.map(user => (
          <div
            key={user.id}
            className="mb-10 rounded-xl bg-white p-6 shadow-xl"
          >
            <UserDetails user={user} searchQuery={searchQuery} />
            <UserPostsAndAlbums userId={user.id} />
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersTree;
