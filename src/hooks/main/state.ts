export interface MainState {
  isNavigationOpen: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
}

export interface MainActions {
  setIsNavigationOpen: (isOpen: boolean) => void;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}
