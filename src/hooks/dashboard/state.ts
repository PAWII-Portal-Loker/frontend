export interface DashboardState {
  isSearchFocused: boolean;
}

export interface DashboardActions {
  setIsSearchFocused: (isFocused: boolean) => void;
}
