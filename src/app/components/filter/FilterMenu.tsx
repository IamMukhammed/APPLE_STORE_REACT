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
const categoryOptions = ["Smartphone", "Tablet", "Laptop", "Watch", "Vision", "Accessories", "All"];

interface FilterSortMenuProps {
    selectedSort: string;
    selectedCategory: string[];
    onSortChange: (sort: string) => void;
    onCategoryChange: (category: string[]) => void;
  }
  
  export default function FilterSortMenu({
    selectedSort,
    selectedCategory,
    onSortChange,
    onCategoryChange
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
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as string[])}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {categoryOptions.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategory.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
}