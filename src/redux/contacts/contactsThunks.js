import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://67234e5d493fac3cf24a60c3.mockapi.io/api/v1/contacts'; 


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const addContact = createAsyncThunk('contacts/addContact', async (contact, { rejectWithValue }) => {
  try {
    const response = await axios.post('/contacts', contact);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
