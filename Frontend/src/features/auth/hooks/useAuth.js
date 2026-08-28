import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    register,
    logout,
    getMe
} from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;


    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password });

            console.log("🔥 LOGIN DATA:", data);
            console.log("🔥 LOGIN USER:", data?.user);

            setUser(data.user);

            console.log("🔥 USER SET:", data.user);

            return true;

        } catch (err) {
            console.log("❌ LOGIN ERROR:", err);
            return false;

        } finally {
            setLoading(false);
        }
    };


    const handleRegister = async ({ username, email, password }) => {

        setLoading(true);

        try {

            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            return true;

        } catch (err) {

            console.log("REGISTER ERROR:", err);

            return false;

        } finally {

            setLoading(false);

        }
    };


    const handleLogout = async () => {

        setLoading(true);

        try {

            await logout();

            setUser(null);

        } catch (err) {

            console.log("LOGOUT ERROR:", err);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        const getAndSetUser = async () => {

            try {
                const data = await getMe();

                console.log("🔥 GET ME DATA:", data);
                console.log("🔥 GET ME USER:", data?.user);

                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }

            } catch (err) {
                console.log("❌ GET ME ERROR:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();

    }, []);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};