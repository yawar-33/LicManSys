import { getItem, setItem } from "./function";

// utils/authHelper.ts
export const getBasicAuthToken = (username: string, password: string): string => {
    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    setItem("tokenData", { token: `${encodedToken}` });
    return `Basic ${encodedToken}`;
};

// utils/authHelper.ts

interface UserData {
    isValidated: boolean;
    [key: string]: any; // Allow for additional properties
}

export const isUserValidated = (): boolean => {
    if (typeof window !== 'undefined') {
        const userData = getItem("userData");
        console.log("userData from localStorage:", userData);
        try {
            if (userData) {
                const parsedData = JSON.parse(userData);
                console.log("Parsed userData:", parsedData);
                return parsedData.isValidated === true;
            }
        } catch (error) {
            console.error("Error parsing userData from localStorage:", error);
        }
    }
    return false;
};