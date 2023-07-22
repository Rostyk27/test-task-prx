import axios from 'axios';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { User } from '../types';

import UserDetails from './UserDetails';
import UserPostsAndAlbums from './UserPostsAndAlbums';

interface UsersTreeProps {
  searchQuery: string;
}

const fetchUsers = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
};

const UsersTree = ({ searchQuery }: UsersTreeProps) => {
  const { data: users, isLoading } = useQuery<User[]>('users', fetchUsers);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;

    return users?.filter(
      user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 pb-4 md:grid-cols-2 xl:gap-x-20">
      {filteredUsers?.length ? (
        filteredUsers.map(user => (
          <div
            key={user.id}
            className="shadow-2 mb-10 rounded-xl bg-white p-6 shadow-xl xl:mb-20"
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
