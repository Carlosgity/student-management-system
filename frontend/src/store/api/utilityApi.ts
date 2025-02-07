import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const utilityApi = createApi({
    reducerPath: "utilityApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api"}),

    endpoints: (builder) => ({
        // Define your endpoints here

         // Fetches the student count
         getStudentCount: builder.query<{count: number}, void>({
            query: () => "/student-count",
         })
    }),
})

export const { useGetStudentCountQuery } = utilityApi;