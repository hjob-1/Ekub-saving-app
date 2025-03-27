import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const frameToken = (token) => {
  return `Bearer ${token}`;
};
export const authHeader = (token) => ({
  headers: {
    Authorization: frameToken(token),
  },
});

const frameResponse = (
  reqStatus = 0,
  reqPayload = 'Invalid request. Please try again later.',
) => {
  return { status: reqStatus, payload: reqPayload };
};

export const registerApi = async (fullname, email, phone, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/users/register`;
    const apiResponse = await axios.post(url, {
      fullname,
      email,
      phone,
      password,
      role: 'admin',
    });
    if (apiResponse.status === 201) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data);
    }
    console.log(err);
  }
  return response;
};

export const loginApi = async (email, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/users/login`;
    const apiResponse = await axios.post(url, { email, password });
    if (apiResponse.status === 200) {
      const payload = {
        userData: apiResponse.data.data,
        message: apiResponse.data.message,
        token: apiResponse.headers.get('authorization'),
      };
      response = frameResponse(1, payload);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data);
    }
    console.log(err);
  }
  return response;
};

export const verifyEmailApi = async (token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/users/activate-account`;

    const apiResponse = await axios.get(url, { ...authHeader(token) });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data);
    }
    console.log(err);
  }
  return response;
};

export const forgotPasswordApi = async (email) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/users/forgot-password`;
    const apiResponse = await axios.post(url, { email });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data);
    }
    console.log(err);
  }
  return response;
};

export const resetPassword = async (token, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/users/reset-password`;
    const apiResponse = await axios.post(
      url,
      { password },
      { ...authHeader(token) },
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data);
    }
    console.log(err);
  }
  return response;
};
