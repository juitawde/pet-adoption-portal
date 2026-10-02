import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { auth, hasConfig } from "../lib/firebase";
import { setupNotifications } from '../lib/notifications';
import {
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const AuthContext = createContext(null);

function saveSession(data) {
    localStorage.setItem("petmatch_token", data.token);
    localStorage.setItem(
        "petmatch_user",
        JSON.stringify(data.user)
    );
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return (
                JSON.parse(
                    localStorage.getItem("petmatch_user")
                ) || null
            );
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem("petmatch_token");
        }
    }, [user]);

    /*
     * IMPORTANT:
     * MongoDB + JWT is the primary authentication system.
     * Firebase is optional and must NEVER prevent
     * normal login/register from working.
     */

    const login = async (email, password) => {
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email: email.trim(),
                password
            });

            const data = response.data;

            saveSession(data);
            setUser(data.user);

            /*
             * Firebase is only synchronized after
             * successful MongoDB/JWT authentication.
             */
            if (hasConfig && auth) {
                try {
                    await signInWithEmailAndPassword(
                        auth,
                        email.trim(),
                        password
                    );
                } catch (firebaseError) {
                    console.warn(
                        "Firebase sign-in skipped:",
                        firebaseError?.code ||
                            firebaseError?.message
                    );
                }
            }

            await setupNotifications();

            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);

        try {
            /*
             * Create the account in MongoDB FIRST.
             * Firebase must not block registration.
             */
            const response = await api.post("/auth/register", {
                name: name.trim(),
                email: email.trim(),
                password
            });

            const data = response.data;

            saveSession(data);
            setUser(data.user);

            /*
             * Firebase synchronization is optional.
             */
            if (hasConfig && auth) {
                try {
                    await signInWithEmailAndPassword(
                        auth,
                        email.trim(),
                        password
                    );
                } catch (firebaseError) {
                    console.warn(
                        "Firebase sign-in skipped:",
                        firebaseError?.code ||
                            firebaseError?.message
                    );
                }
            }

            await setupNotifications();

            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        /*
         * Firebase logout is optional.
         */
        if (hasConfig && auth) {
            try {
                await signOut(auth);
            } catch {
                // Ignore Firebase logout errors.
            }
        }

        localStorage.removeItem("petmatch_token");
        localStorage.removeItem("petmatch_user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);