import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const fetchPost = async (postId: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.data;
};

const PostPage = () => {
  const { postId } = useParams() as { postId: string };

  const { data: post, isLoading } = useQuery<Post>(['post', postId], () =>
    fetchPost(postId)
  );

  if (isLoading) {
    return <div className="container pt-10">Loading post...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post?.title} - Test App</title>
      </Helmet>

      <div className="container">
        <div className="max-w-3xl">
          {post ? (
            <div className="content">
              <h1 className="first-letter:capitalize">{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ) : (
            <p className="pt-10">Post not found.</p>
          )}

          <Link to="/" className="button">
            Back home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostPage;
