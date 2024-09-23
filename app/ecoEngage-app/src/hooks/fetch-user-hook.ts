import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../store/user-slice";
import { AuthService } from "../services/auth-service";

/**
 * useFetchUser hook fetches the user data from the server and sets it in the state.
 * It returns the user data from the state.
 */

const useFetchUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const setUserInState = async () => {
            try {
                const user = await AuthService.getUser();
                console.log("User data set:", user);
                dispatch(setUser(user));
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        setUserInState();
    }, [dispatch]);

    return useSelector(getUser);
};

export default useFetchUser;
