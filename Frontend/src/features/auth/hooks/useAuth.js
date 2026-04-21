import { register, login, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import AuthContext from "../auth.context";
import { useLocation } from "react-router";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    async function handleRegister(username, email, password) {
        setLoading(true);
        try {
            const data = await register(username, email, password);
            if (data?.user) {
                setUser(data.user)
            }
            return data.user;
        } catch (error) {
            throw error?.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(username, email, password) {
        setLoading(true);
        try {
            const data = await login(username, email, password);
            if (data?.user) {
                setUser(data.user)
            }
            return data.user;
        } catch (error) {
            throw error?.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    }

    async function handleGetMe() {
        setLoading(true);
        try {
            const data = await getMe();
            if (data?.user) {
                setUser(data.user);
            }
            return data?.user;
        } catch (error) {
            setUser(null);
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);
        try {
            const data = await logout();
            if (data) {
                setUser(null)
            }
            return null;
        } catch (error) {
            throw error?.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    }

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/login") {
            handleGetMe();
        }
    }, []);

    return ({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    });
}