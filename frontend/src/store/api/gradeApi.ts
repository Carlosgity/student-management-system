// src/store/api/gradeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Grade {
    studentId: number;
    mathematics: number;
    science: number;
    english_language: number;
    social_studies: number;
    physical_education: number;
    religious_education: number;
    average: number;
}

export const gradeApi = createApi({
    reducerPath: 'gradeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({

        // builder.query<ReturnType, ParameterType>
        getGradesByStudentId: builder.query<Grade, number>({
            query: (studentId) => `/grades/${studentId}`,
        }),

        addGrade: builder.mutation<Grade, { studentId: number; grade: Partial<Grade> }>({
            query: ({ studentId, grade }) => ({
                url: `/grades/${studentId}`,
                method: 'POST',
                body: grade,
            }),
        }),

        updateGrade: builder.mutation<Grade, { studentId: number; grade: Partial<Grade> }>({
            query: ({ studentId, grade }) => ({
                url: `/grades/${studentId}`,
                method: 'PUT',
                body: grade,
            }),
        }),
        
        deleteGrade: builder.mutation<void, number>({
            query: (studentId) => ({
                url: `/grades/${studentId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetGradesByStudentIdQuery,
    useAddGradeMutation,
    useUpdateGradeMutation,
    useDeleteGradeMutation,
} = gradeApi;
