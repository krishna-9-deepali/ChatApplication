import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
function useGetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true; //used this for authenticated url (Middleware used), try to access without this we cant get  othere users.
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/`
        );
        //store
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
}

export default useGetOtherUsers;
