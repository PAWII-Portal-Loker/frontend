export interface CommonStoreState<T> {
  data: T[];
  isLoading: boolean;

  setData: (data: T[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchData: () => void;
}

export const initialCommonState = {
  data: [],
  isLoading: false,
};
