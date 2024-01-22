import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";

import { toast } from "react-toastify";
import { auth, db } from "./config.firebase";
import { addDoc, collection } from "firebase/firestore";

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clear = () => {
        setAuthUser(null);
        setIsLoading(false);
    };

    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
            clear();
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
        });

        setIsLoading(false);
        const result = await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email: user.email,
        })
        console.log(result)
    };

    const signOut = () => {
        authSignOut(auth).then(() => {
            clear();
            toast.success("Logout succesfully", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        );

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut,
    };
}

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();

    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);