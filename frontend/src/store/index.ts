import { configureStore } from "@reduxjs/toolkit";
import adminDataReducer from "./slices/adminDataSlice";
import userDataReducer from "./slices/userDataSlice";
// ...

export const store = configureStore({
  reducer: {
    adminData: adminDataReducer,
    userData: userDataReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
