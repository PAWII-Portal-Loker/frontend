import { create } from "zustand";
import UserService from "./service";
import { UserDto } from "./types";
import { UserStoreState } from "./types/storeState";
import useMainStore from "@hooks/main/store";
import { toaster } from "@ui/toaster";

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

const { setLoginDialogOpen, setRegisterDialogOpen } = useMainStore.getState();

const useUserStore = create<UserStoreState>((set, get) => ({
  users: [],
  isUsersLoading: false,
  user: DefaultUserDto,
  isUserLoading: false,

  setUsers: (users) => set({ users }),
  setUsersLoading: (isUsersLoading) => set({ isUsersLoading }),
  setUser: (user) => set({ user }),
  setUserLoading: (isUserLoading) => set({ isUserLoading }),

  getUsers: () => {
    get().setUsersLoading(true);

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
        get().setUsersLoading(false);
      },
    });
  },

  getUser: (id) => {
    get().setUserLoading(true);

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
        get().setUserLoading(false);
      },
    });
  },

  createUser: (request) => {
    const { email, wa_number, password } = request;
    get().setUserLoading(true);

    userService.createUser(
      { email, password, wa_number },
      {
        onSuccess: () => {
          toaster.create({
            title: "Registration successful",
            type: "success",
            duration: 3000,
          });
          setRegisterDialogOpen(false);
          setLoginDialogOpen(true);
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
          get().setUserLoading(false);
        },
      }
    );
  },
}));

export default useUserStore;
