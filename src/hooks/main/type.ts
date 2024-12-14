export interface MainStoreState {
  isNavigationOpen: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;

  setNavigationOpen: (isOpen: boolean) => void;
  setLoginDialogOpen: (isOpen: boolean) => void;
  setRegisterDialogOpen: (isOpen: boolean) => void;
}
