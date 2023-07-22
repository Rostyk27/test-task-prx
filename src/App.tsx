import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';

import HomePage from './pages/home';
import PostPage from './pages/post';
import AlbumPage from './pages/album';

const queryClient = new QueryClient();
const helmetContext = {};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/albums/:albumId" element={<AlbumPage />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
