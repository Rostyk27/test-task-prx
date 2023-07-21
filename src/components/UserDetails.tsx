import { User } from '../types';

const UserDetails = ({ user }: { user: User }) => {
  return (
    <>
      <h2>{user.name}</h2>
      <div className="mb-6 text-sm">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </>
  );
};

export default UserDetails;
