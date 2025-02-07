// /src/api/studentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Student {
  id: number;  // id is now required for all students
  student_img: string;
  student_name: string;
  student_age: number;
  s_parent_name: string;
  student_address: string;
  student_contact: string;
}

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({

    getStudents: builder.query<Student[], void>({
      query: () => '/students',
    }),

    getStudentById: builder.query<Student, number>({
      query: (id) => `/students/${id}`,
    }),

    addStudent: builder.mutation<Student, Partial<Omit<Student, 'id'>>>({
      query: (newStudent) => ({
        url: '/students',
        method: 'POST',
        body: newStudent,
      }),
    }),

    updateStudent: builder.mutation<void, Student>({
      query: (student) => ({
        url: `students/${student.id}`,
        method: 'PUT',
        body: student,
      }),
    }),
    
    deleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
