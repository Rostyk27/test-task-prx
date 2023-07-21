import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { User, Post, Album } from '../types';

interface UserPostsAndAlbumsProps {
  userId: number;
}

const fetchUserName = async (userId: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.data.name;
};

const fetchUserPosts = async (userId: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.data;
};

const fetchUserAlbums = async (userId: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  return response.data;
};

const UserPostsAndAlbums = ({ userId }: UserPostsAndAlbumsProps) => {
  const { data: userName } = useQuery<User>({
    queryKey: ['userName', userId],
    queryFn: () => fetchUserName(userId),
    enabled: !!userId,
  });
  const { data: userPosts } = useQuery<Post[]>({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });
  const { data: userAlbums } = useQuery<Album[]>({
    queryKey: ['userAlbums', userId],
    queryFn: () => fetchUserAlbums(userId),
    enabled: !!userId,
  });

  return (
    <div>
      <h3>{userName ? `${userName}'s posts` : 'Autors posts'}</h3>

      <ol className="mb-4">
        {userPosts?.map(post => (
          <li key={post.id} className="first-letter:capitalize">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>

      <h3>{userName ? `${userName}'s albums` : 'Autors albums'}</h3>

      <ol>
        {userAlbums?.map(album => (
          <li key={album.id} className="first-letter:capitalize">
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserPostsAndAlbums;
