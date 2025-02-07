import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentBySubjectApi = createApi({

    reducerPath: 'studentBySubjectApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),

    endpoints: (builder) => ({
        getSubjects: builder.query<any[], void>({ // Specify `void` as the type for no arguments
            query: () => '/subjects',
        }),
        
        getGradesBySubject: builder.query<any[], number | null>({
            query: (subjectId) => `/student-grade/${subjectId}`,
        }),

        updateGrade: builder.mutation<void, { studentId: number; subjectId: number; gradeData: any }>({
            query: ({ studentId, subjectId, gradeData }) => ({
              url: `/student-grade/${studentId}/${subjectId}`,
              method: 'PUT',
              body: gradeData,
            }),
        })
    }),
})



export const {useGetSubjectsQuery, useGetGradesBySubjectQuery, useUpdateGradeMutation} = studentBySubjectApi