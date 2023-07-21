import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../types';

import UserDetails from './UserDetails';
import UserPostsAndAlbums from './UserPostsAndAlbums';

const fetchUsers = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
};

const UsersTree = () => {
  const { data: users, isLoading } = useQuery<User[]>('users', fetchUsers);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 pb-4 md:grid-cols-2 xl:gap-x-20">
      {users?.map(user => (
        <div
          key={user.id}
          className="shadow-2 mb-10 rounded-xl bg-white p-6 shadow-xl xl:mb-20"
        >
          <UserDetails user={user} />
          <UserPostsAndAlbums userId={user.id} />
        </div>
      ))}
      {users && users.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default UsersTree;
