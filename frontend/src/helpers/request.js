import axios from "axios";

const token = localStorage.getItem('token');

export const sendRequest = async ({ route, body, method = "GET" }) => {
  try {
    const response = await axios.request({
      url: `http://localhost/Hospital-Management-System/server/${route}.php`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization" : `${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};