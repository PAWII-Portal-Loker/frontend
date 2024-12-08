export interface CommonState<T> {
  data: T[];
  isLoading: boolean;
}

export interface CommonActions<T> {
  setData: (data: T[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchData: () => void;
}
