import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchRoadmap, fetchRoadmapWithId, generateRoadmap } from "@/api/roadmap";

const initialState = {
  allRoadmaps: [],
  selectedRoadmap: null,
  userInput: null,
  roadmapGeneration: null,
  status: "idle",
  error: null,
  selectedNode: null,
};

export const getRoadmapData = createAsyncThunk(
  "roadmap/fetchRoadmap",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchRoadmap();

      // console.log('response', response);
      const firstRoadmap = response?.roadmaps?.[0];
      // console.log('firstRoadmap', firstRoadmap);
      if (firstRoadmap?.status === "generating") {
        dispatch(setRoadmapGeneration({
          message: "Roadmap generation started",
          roadmap_id: firstRoadmap.id,
          status: "generating",
        }));
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch roadmap");
    }
  }
);

export const getSelectedRoadmap = createAsyncThunk(
  "roadmap/getSelectedRoadmap",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchRoadmapWithId(id);
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch roadmap");
    }
  }
);

export const createRoadmap = createAsyncThunk(
  "roadmap/createRoadmap",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await generateRoadmap(userInput);
      // Navigation is handled in the component using useNavigate
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to generate roadmap");
    }
  }
);

export const setUserInput = createAsyncThunk(
  "roadmap/setUserInput",
  async (userInput) => {
    return userInput;
  }
);

export const setRoadmapGeneration = createAsyncThunk(
  "roadmap/setRoadmapGeneration",
  async (roadmapGeneration) => {
    return roadmapGeneration;
  }
);

export const setSelectedRoadmap = createAsyncThunk(
  "roadmap/setSelectedRoadmap",
  async (selectedRoadmap) => {
    return selectedRoadmap;
  }
);

export const setSelectedNodeGraph = createAsyncThunk(
  "roadmap/setSelectedNodeGraph",
  async (selectedNode) => {
    return selectedNode;
  }
);

export const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoadmapData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRoadmapData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allRoadmaps = action.payload;
      })
      .addCase(getRoadmapData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || null;
      })
      .addCase(getSelectedRoadmap.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSelectedRoadmap.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRoadmap = action.payload?.roadmap;
      })
      .addCase(getSelectedRoadmap.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || null;
      })
      .addCase(createRoadmap.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.roadmapGeneration = null;
      })
      .addCase(createRoadmap.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRoadmap = action.payload;
        state.roadmapGeneration = action.payload;
      })
      .addCase(createRoadmap.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || null;
        state.roadmapGeneration = null;
      })
      .addCase(setUserInput.fulfilled, (state, action) => {
        state.userInput = action.payload;
      })
      .addCase(setRoadmapGeneration.fulfilled, (state, action) => {
        state.roadmapGeneration = action.payload;
      })
      .addCase(setSelectedRoadmap.fulfilled, (state, action) => {
        state.selectedRoadmap = action.payload;
      })
      .addCase(setSelectedNodeGraph.fulfilled, (state, action) => {
        state.selectedNode = action.payload;
      });
  },
});

export default roadmapSlice.reducer;

