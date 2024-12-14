import { create } from "zustand";
import UserService from "./service";
import { UserDto } from "./types";
import { UserStoreState } from "./types/storeState";
import useMainStore from "@hooks/main/store";
import { toaster } from "@components/ui/toaster";

export const DefaultUserDto: UserDto = {
  id: "",
  role: "",
  email: "",
  wa_number: "",
  image_url: "",
  bio: "",
  country: "",
  province: "",
  city: "",
  subdistrict: "",
  address: "",
  created_at: new Date(),
  updated_at: new Date(),
};

const userService = new UserService();

const { setIsLoginDialogOpen, setIsRegisterDialogOpen } =
  useMainStore.getState();

const useUserStore = create<UserStoreState>((set, get) => ({
  users: [],
  isUsersLoading: false,
  user: DefaultUserDto,
  isUserLoading: false,

  setUsers: (users) => set({ users }),
  setIsUsersLoading: (isUsersLoading) => set({ isUsersLoading }),
  setUser: (user) => set({ user }),
  setIsUserLoading: (isUserLoading) => set({ isUserLoading }),

  getUsers: () => {
    get().setIsUsersLoading(true);

    userService.getUsers({
      onSuccess: (data) => {
        get().setUsers(data);
      },
      onError: () => {
        toaster.create({
          title: "Failed to get users",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsUsersLoading(false);
      },
    });
  },

  getUser: (id) => {
    get().setIsUserLoading(true);

    userService.getUser(id, {
      onSuccess: (data) => {
        get().setUser(data);
      },
      onError: () => {
        toaster.create({
          title: "Failed to get user",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsUserLoading(false);
      },
    });
  },

  createUser: (request) => {
    const { email, wa_number, password } = request;
    get().setIsUserLoading(true);

    userService.createUser(
      { email, password, wa_number },
      {
        onSuccess: () => {
          toaster.create({
            title: "Registration successful",
            type: "success",
            duration: 3000,
          });
          setIsRegisterDialogOpen(false);
          setIsLoginDialogOpen(true);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Registration failed",
            description: message || "Failed to register",
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setIsUserLoading(false);
        },
      },
    );
  },
}));

export default useUserStore;
