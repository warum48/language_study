import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dicts: []
};

export const dictsSlice = createSlice({
  name: "dicts",
  initialState,
  reducers: {
    addDict: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.dicts.push(action.payload);
      console.log("adddict action.payload", action.payload);
    },
    deleteAllDicts: (state) => {
      //state.dicts.splice(3 /*the index */, 1)
      state.dicts = [];
    },
    deleteDictNum: (state, action) => {
      //state.count += action.payload;
      console.log("act", action);
      state.dicts.splice(1, 1);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addDict, deleteAllDicts, deleteDictNum } = dictsSlice.actions;

export default dictsSlice.reducer;
