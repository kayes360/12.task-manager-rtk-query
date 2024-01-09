import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () =>{
                return '/tasks'
            }
        }),
        addTask: builder.mutation({
            query: (data) =>({
                url: '/tasks', 
                method: "POST",
                body: data,
            }),
        // ______________________________ 

      

        // ______________________________


        }),

    })
})

export const {useGetTasksQuery, useAddTaskMutation} = tasksApi