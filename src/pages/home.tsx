import { useState } from 'react';
import UsersTree from '../components/UsersTree';
import UsersSearch from '../components/UsersSearch';
import UsersSort from '../components/UsersSort';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('id');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  return (
    <div className="container">
      <h1>All users</h1>

      <div className="filters mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-8">
        <UsersSearch searchQuery={searchQuery} onSearch={handleSearch} />
        <UsersSort sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      <UsersTree searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
};

export default HomePage;
