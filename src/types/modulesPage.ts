export interface IHero {
  title: string;
  subtitle: string;
}

export interface IFilterOption {
  label: string;
  options: string[];
}

export interface ISizeRange {
  label: string;
  min: number;
  max: number;
}

export interface ISizeFilter {
  label: string;
  ranges: ISizeRange[];
}

export interface IFilters {
  bedrooms: IFilterOption;
  bathrooms: IFilterOption;
  size: ISizeFilter;
}

export interface ISortOption {
  value: string;
  label: string;
}

export interface ISort {
  label: string;
  options: ISortOption[];
}

export interface IEmptyState {
  title: string;
  message: string;
}

export interface ISearch {
  placeholder: string;
  label: string;
  ariaDescription: string;
}

export interface IResults {
  showing: string;
  of: string;
  modules: string;
}

export interface IClearFilters {
  label: string;
  ariaLabel: string;
}

export interface IModulesPageContent {
  hero: IHero;
  filters: IFilters;
  sort: ISort;
  emptyState: IEmptyState;
  search: ISearch;
  results: IResults;
  clearFilters: IClearFilters;
  metadataImage: string;
}

export interface IFilterState {
  bedrooms: string;
  bathrooms: string;
  size: string;
  search: string;
  sort: string;
}

export type SortOption =
  | 'default'
  | 'size-asc'
  | 'size-desc'
  | 'bedrooms-asc'
  | 'bedrooms-desc';
