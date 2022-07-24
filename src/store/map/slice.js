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
    isTreeDeleted: false,
    isTreeAdded: false,
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

export const fetchAddTree = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-add-tree`,
    async (data) => {
        const response = await axios.post('https://mainstage-it-revolution.herokuapp.com/api/v1/trees', data);
        return response.data;
    }
);

export const fetchDeleteTree = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-delete-tree`,
    async (id) => {
        const response = await axios.post(`https://mainstage-it-revolution.herokuapp.com/api/v1/trees/${id}/delete`);
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
        // getBaseImage
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
        // fetchAddTree
        [fetchAddTree.pending]: (state) => {
            state.loading = true
            state.isTreeAdded = false
        },
        [fetchAddTree.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchAddTree.fulfilled]: (state, action) => {
            state.loading = false
            state.isTreeAdded = true
        },
        //fetchDeleteTree
        [fetchDeleteTree.pending]: (state) => {
            state.loading = true
            state.isTreeDeleted = false
        },
        [fetchDeleteTree.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchDeleteTree.fulfilled]: (state, action) => {
            state.loading = false
            state.isTreeDeleted = true
        },
    },
});

// Selectors
export const selectAllTrees = (state) => state.map.trees;
export const selectLoading = (state) => state.map.loading;
export const selectBaseImage = (state) => state.map.imageBase;
export const selectIsTreeDeleted = (state) => state.map.isTreeDeleted;
export const selectIsTreeAdded = (state) => state.map.isTreeAdded;

// Reducer
export const mapReducer = mapSlice.reducer;