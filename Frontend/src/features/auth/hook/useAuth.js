import { setUser, setLoading, setError } from "../state/auth.slice";
import { register, login, getMe, logout } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
    try {
       const data = await register({ email, contact, password, fullname, isSeller })
       dispatch(setUser(data.user))
       return data.user
    } catch (error) {
        console.error("Error registering user:", error);
        dispatch(setError(error.message));
        throw error;
    }
}

async function handleLogin({ email, password }) {
    try {
        const data = await login({ email, password });
        dispatch(setUser(data.user));
        return data.user
    } catch (error) {
        console.error("Error logging in:", error);
        dispatch(setError(error.message));
        throw error;
    }
}

async function handleGetMe() {
  try {
    dispatch(setLoading(true));
    const data = await getMe();
    dispatch(setUser(data.user));
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(setError(error.message));
  }finally{
    dispatch(setLoading(false));
  }
}

async function handleLogout() {

  try {
    await logout();
    dispatch(setUser(null));
  } catch (error) {
    console.error("Error logging out:", error);
    dispatch(setError(error.message));
  }
}
  


  return { handleRegister, handleLogin, handleGetMe, handleLogout };

}
