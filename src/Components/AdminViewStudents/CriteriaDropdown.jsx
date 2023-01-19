import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const CriteriaDropdown = ({
  inputLabel,
  label,
  defaultVal,
  defaultValName,
  chosen,
  handleChange,
  available,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={chosen}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value={defaultVal}>{defaultValName}</MenuItem>
        {available.map((row, index) => (
          <MenuItem value={row} key={row}>
            {row}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CriteriaDropdown;
