import { createContext, useEffect, useState } from "react";

// Create context
export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    async function getUser() {
        // Ensure we don't try fetching the user without a token
        if (!token) return;

        try {
            const res = await fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data); // Set the user if the request succeeds
            } else {
                // Token might be invalid or expired
                setToken(null);
                setUser(null);
                localStorage.removeItem("token"); // Remove invalid token
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // Handle the error appropriately
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    // Sync token with localStorage whenever it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
