import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  FormControl,
  Box,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
} from "@mui/material";

const sortOptions = ["Newest", "Price", "Most Viewed"];
const brandOptions = ["Smartphone", "Tablet", "Laptop", "Watch", "Accessories", "All"];

interface FilterSortMenuProps {
    selectedSort: string;
    selectedBrands: string[];
    onSortChange: (sort: string) => void;
    onBrandChange: (brands: string[]) => void;
  }
  
  export default function FilterSortMenu({
    selectedSort,
    selectedBrands,
    onSortChange,
    onBrandChange
  }: FilterSortMenuProps) {
    return (
      <Box className="filter-sort-menu">
        <FormControl className="filter-select">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            input={<OutlinedInput label="Sort By" />}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl className="filter-select">
          <InputLabel>Brands</InputLabel>
          <Select
            multiple
            value={selectedBrands}
            onChange={(e) => onBrandChange(e.target.value as string[])}
            input={<OutlinedInput label="Brands" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {brandOptions.map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={selectedBrands.indexOf(brand) > -1} />
                <ListItemText primary={brand} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
}