import Select from 'react-select';

interface UsersSortProps {
  sortOption: string;
  onSortChange: (sort: string) => void;
}

const sortingOptions = [
  { value: 'id', label: 'Default' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
];

const UsersSort = ({ sortOption, onSortChange }: UsersSortProps) => {
  return (
    <div>
      <label>
        <small>Sort by:</small>
      </label>

      <Select
        options={sortingOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        isSearchable={false}
        defaultValue={sortingOptions[0]}
        onChange={e => e && onSortChange(e.value)}
        value={{
          value: sortOption,
          label:
            sortingOptions.find(option => option.value === sortOption)?.label ??
            '',
        }}
      />
    </div>
  );
};

export default UsersSort;
