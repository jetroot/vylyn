import { USER_KEY_LOCAL_STORAGE_NAME } from "@/config";
import Cookies from "js-cookie";

// Get item from cookies
export const getItemFromCookies = (_key: string) => {
    return Cookies.get(_key) || null;
};

// Set item in cookies
export const setItemInCookies = (
    _key: string,
    _value: any,
    cookieOption?: object
) => {
    if (_key && _value) {
        Cookies.set(_key, _value, cookieOption);
    }
};

// Store user in local storage
export const storeUserInLocalStorage = (user: any) => {
    if (user)
        localStorage.setItem(USER_KEY_LOCAL_STORAGE_NAME, JSON.stringify(user));
};

// Get data from local store
export const getDataFromLocalStorage = (
    _storageKey: string,
    _objectKey?: string
) => {
    if (typeof window !== "undefined") {
        // Get the whole object
        if (localStorage.getItem(_storageKey) && !_objectKey) {
            return localStorage.getItem(_storageKey) || null;
        }

        // Get object value by its key
        if (localStorage.getItem(_storageKey) && _objectKey) {
            if (isObject(JSON.parse(localStorage.getItem(_storageKey)!))) {
                const objData = JSON.parse(localStorage.getItem(_storageKey)!);
                return objData[_objectKey];
            }

            return null;
        }
    }
};

// is Object
export const isObject = (data: any) => {
    return typeof data === "object" ? true : false;
};
