export interface CommonState {
  data: string[];
  isLoading: boolean;
}

export interface CommonActions {
  setData: (data: string[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchData: () => void;
}
