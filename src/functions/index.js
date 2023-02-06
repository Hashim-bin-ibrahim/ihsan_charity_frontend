import axios from "axios";
export const signup = async (username, mobile, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        username,
        mobile,
        password,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const login = async (username, password, adminLogin) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        username,
        password,
        adminLogin,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
