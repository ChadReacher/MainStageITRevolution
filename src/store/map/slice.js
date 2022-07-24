import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

// Name of the slice
const MAP_SLICE_NAME = 'map'

const initialState = {
    trees: [],
    neededWorkTrees: [],
    healthyTrees: [],
    removalTrees: [],
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

// Tree report 
export const fetchNeededWorkTrees = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-needed-work-trees`,
    async () => {
        const response = await axios.get('https://mainstage-it-revolution.herokuapp.com/api/v1/trees?sort=work');
        return response.data;
    }
);

export const fetchHealthyTrees = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-healthy-tree`,
    async () => {
        const response = await axios.get('https://mainstage-it-revolution.herokuapp.com/api/v1/trees?sort=healthy');
        return response.data;
    }
);

export const fetchRemovalTrees = createAsyncThunk(
    `${MAP_SLICE_NAME}/fetch-removal-tree`,
    async () => {
        const response = await axios.get('https://mainstage-it-revolution.herokuapp.com/api/v1/trees?sort=removal');
        return response.data;
    }
);

// File choosing
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
        //fetchNeededWorkTrees
        [fetchNeededWorkTrees.pending]: (state) => {
            state.loading = true
        },
        [fetchNeededWorkTrees.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchNeededWorkTrees.fulfilled]: (state, action) => {
            state.loading = false
            state.neededWorkTrees = action.payload
        },
        // fetchRemovalTrees
        [fetchRemovalTrees.pending]: (state) => {
            state.loading = true
        },
        [fetchRemovalTrees.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchRemovalTrees.fulfilled]: (state, action) => {
            state.loading = false
            state.removalTrees = action.payload
        },
        //fetchHealthyTrees
        [fetchHealthyTrees.pending]: (state) => {
            state.loading = true
        },
        [fetchHealthyTrees.rejected]: (state) => {
            state.loading = false
            state.error = true
        },
        [fetchHealthyTrees.fulfilled]: (state, action) => {
            state.loading = false
            state.healthyTrees = action.payload
        },
    },
});

// Selectors
export const selectAllTrees = (state) => state.map.trees;
export const selectLoading = (state) => state.map.loading;
export const selectBaseImage = (state) => state.map.imageBase;
export const selectIsTreeDeleted = (state) => state.map.isTreeDeleted;
export const selectIsTreeAdded = (state) => state.map.isTreeAdded;

export const selectNeededWorkTrees = (state) => state.map.neededWorkTrees;
export const selectRemovalTrees = (state) => state.map.removalTrees;
export const selectHealthyTrees = (state) => state.map.healthyTrees;
// Reducer
export const mapReducer = mapSlice.reducer;