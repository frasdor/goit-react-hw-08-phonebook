import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/signup', userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      console.error('Error response:', error.response); // Dodanie logowania pełnej odpowiedzi błędu
      if (error.response) {
        console.error('Error data:', error.response.data); // Zawartość błędu
        console.error('Error status:', error.response.status); // Status błędu
        console.error('Error headers:', error.response.headers); // Nagłówki odpowiedzi
      } else {
        console.error('Unknown error:', error.message); // Obsługa innych błędów
      }
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
      .addCase(registerUser.fulfilled, (state, action) => {
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
