interface UsersSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const UsersSearch = ({ searchQuery, onSearch }: UsersSearchProps) => {
  return (
    <div>
      <label htmlFor="search">
        <small>Search:</small>
      </label>

      <input
        id="search"
        type="search"
        placeholder="Search users"
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default UsersSearch;
