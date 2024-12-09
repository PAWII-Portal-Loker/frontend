export interface MainStoreState {
  isNavigationOpen: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;

  setIsNavigationOpen: (isOpen: boolean) => void;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}
