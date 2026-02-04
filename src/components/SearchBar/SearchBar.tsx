import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBarProps } from '../../types';



const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Cerca ricetta"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{marginBottom: 4}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{
        'aria-label': 'Cerca una ricetta per nome',
      }}
    />
  );
};

export default SearchBar;
