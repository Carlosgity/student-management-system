// /src/api/courseGradeApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CourseGrade {
    id: number;
    student_id: number;
    student_name: string;
    student_img: string;
    subject: string;
    test1: number;
    test2: number;
    project: number;
    assignment: number;
    final_exam: number;
    average: number;
}

export interface CourseHeader {
    id: number;
    test1: string;
    test2: string;
    project: string;
    assignment: string;
    final_exam: string;
}


export const courseGradeApi = createApi({
    reducerPath: 'courseGradeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({
        
        getAllCourseGrades: builder.query<CourseGrade[], void>({
            query: () => '/courseGrades',
        }),
        getCourseGradesByStudentId: builder.query<CourseGrade[], number>({
            query: (studentId) => `/courseGrades/${studentId}`,
        }),
        addCourseGrade: builder.mutation<CourseGrade, { studentId: number; gradeData: Partial<CourseGrade> }>({
            query: ({ studentId, gradeData }) => ({
                url: `/courseGrades/${studentId}`,
                method: 'POST',
                body: gradeData,
            }),
        }),
        updateCourseGrade: builder.mutation<CourseGrade, { id: number; gradeData: Partial<CourseGrade> }>({
            query: ({ id, gradeData }) => ({
                url: `/courseGrades/${id}`,
                method: 'PUT',
                body: gradeData,
            }),
        }),
        deleteCourseGrade: builder.mutation<void, number>({
            query: (id) => ({
                url: `/courseGrades/${id}`,
                method: 'DELETE',
            }),
        }),


        getCourseHeader: builder.query<CourseHeader[], string>({
            query: () => '/course-header',  // Add the /api prefix here
        }),

        updateCourseHeader: builder.mutation<CourseHeader, { id: number; headerData: Partial<CourseHeader> }>({
            query: ({ id, headerData }) => ({
                url: `/course-header/${id}`,
                method: 'PUT',
                body: headerData,
            }),
        
        })

        
    }),
});

export const {
    useGetAllCourseGradesQuery,
    useGetCourseGradesByStudentIdQuery,
    useAddCourseGradeMutation,
    useUpdateCourseGradeMutation,
    useDeleteCourseGradeMutation,
    useGetCourseHeaderQuery,
    useUpdateCourseHeaderMutation,
} = courseGradeApi;
