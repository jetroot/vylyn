import { USER_KEY_LOCAL_STORAGE_NAME } from "@/config";
import { getDataFromLocalStorage } from "@/utils/storage";
import { createContext, ReactNode, useState } from "react";

type AuthUser = {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
};

const AuthUserInitialState: AuthUser = {
    id: getDataFromLocalStorage(USER_KEY_LOCAL_STORAGE_NAME, "id")!,
    email: getDataFromLocalStorage(USER_KEY_LOCAL_STORAGE_NAME, "email")!,
    full_name: getDataFromLocalStorage(
        USER_KEY_LOCAL_STORAGE_NAME,
        "full_name"
    )!,
    avatar_url: getDataFromLocalStorage(
        USER_KEY_LOCAL_STORAGE_NAME,
        "avatar_url"
    )!,
};

export type UserContextType = {
    user: AuthUser | null;
    setUser: any;
};

type UserContextProviderType = {
    children: ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
    const [user, setUser] = useState<AuthUser | null>(AuthUserInitialState);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
