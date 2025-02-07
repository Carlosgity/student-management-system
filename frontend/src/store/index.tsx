import { userLoginApi } from "./api/userLoginApi";
import { configureStore } from '@reduxjs/toolkit';
import { studentApi } from './api/studentApi';
import { utilityApi } from "./api/utilityApi";
import { gradeApi } from "./api/gradeApi";
import { courseGradeApi } from "./api/courseGradeApi";
import { studentBySubjectApi } from "./api/studentBySubjectApi";

export const store = configureStore({
    reducer: {
        [userLoginApi.reducerPath]: userLoginApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [utilityApi.reducerPath]: utilityApi.reducer,
        [gradeApi.reducerPath]: gradeApi.reducer,
        [courseGradeApi.reducerPath]: courseGradeApi.reducer,
        [studentBySubjectApi.reducerPath]: studentBySubjectApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userLoginApi.middleware).concat(studentApi.middleware).concat(utilityApi.middleware)
        .concat(gradeApi.middleware).concat(courseGradeApi.middleware).concat(studentBySubjectApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
