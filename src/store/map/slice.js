import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

// Name of the slice
const MAP_SLICE_NAME = 'map'

const initialState = {
    trees: [],
    loading: false,
    imageBase: '',
    error: false,
};

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Async action
export const fetchAllTrees = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-trees`,
    async () => {
        const response = await axios.get('https://mainstage-it-revolution.herokuapp.com/api/v1/trees');
        return response.data;
    }
);

export const getBaseImage = createAsyncThunk(
    `${MAP_SLICE_NAME}/get-image-get`,
    async (file) => {
        const data = await getBase64(file);
        return data.split(',')[1];
    }
);

// Slice
export const mapSlice = createSlice({
    name: MAP_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllTrees.pending]: (state) => {
            state.loading = true
        },
        [fetchAllTrees.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchAllTrees.fulfilled]: (state, action) => {
            state.trees = action.payload
            state.loading = false
        },
        [getBaseImage.pending]: (state) => {
            state.loading = true
        },
        [getBaseImage.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [getBaseImage.fulfilled]: (state, action) => {
            state.imageBase = action.payload
            state.loading = false
        },
    },
});

// Selectors
export const selectAllTrees = (state) => state.map.trees;
export const selectLoading = (state) => state.map.loading;
export const selectBaseImage = (state) => state.map.imageBase;

// Reducer
export const mapReducer = mapSlice.reducer;
/**
 * {"registeredNumber":1,
 * "crownRadius":2.0,
 * "age":11,
 * "type":"Vascular plants",
 * "condition":"Good",
 * "image":{"imageId":8,"imageData":""},
 * ,"workTypes":[{"id":2,"workType":"treatment"}],
 * "latitude":49.23664069,
 * "longitude":28.47024834}
 */