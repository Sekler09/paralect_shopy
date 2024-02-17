import { ComboboxItem } from '@mantine/core';

export const PER_PAGE = 6;

export const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];
