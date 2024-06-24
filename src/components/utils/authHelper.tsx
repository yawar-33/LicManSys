import { setItem } from "./function";

// utils/authHelper.ts
export const getBasicAuthToken = (username: string, password: string): string => {
    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    setItem("tokendata", { token: `${encodedToken}` });
    return `Basic ${encodedToken}`;
};