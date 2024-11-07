import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => { 
  // const regidter = createAsyncThunk("auth/register", (credentials, thunkAPI0) => {
    // try {
    // const res = axios.post("/users/signup", credentials);
    // console.log(res);
    //  return res.data;
    // } catch (err) {
    // return thunkAPI.rejectWithValue(err.message);
    // }
    // });

    // export { register };
    try {
      const response = await axios.post('/users/signup', userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message); // Zwróć pełny komunikat błędu
    }
  });
  

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/users/login', userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post('/users/logout');
    delete axios.defaults.headers.common['Authorization'];
    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
