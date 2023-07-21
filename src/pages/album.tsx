import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Album } from '../types';

const fetchAlbum = async (albumId: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );
  return response.data;
};

const AlbumPage = () => {
  const { albumId } = useParams() as { albumId: string };

  const { data: album, isLoading } = useQuery<Album>(['album', albumId], () =>
    fetchAlbum(albumId)
  );

  if (isLoading) {
    return <div className="container pt-10">Loading album...</div>;
  }

  return (
    <div className="container">
      <div className="max-w-3xl">
        {album ? (
          <h1 className="first-letter:capitalize">{album.title}</h1>
        ) : (
          <p className="pt-10">Album not found.</p>
        )}

        <Link to="/" className="button">
          Back home
        </Link>
      </div>
    </div>
  );
};

export default AlbumPage;
