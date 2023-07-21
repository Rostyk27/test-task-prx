import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/home';
import PostPage from './pages/post';
import AlbumPage from './pages/album';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
