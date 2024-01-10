import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => {
        return "/tasks";
      },
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      // ______________________________
      // pessimistic add start
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft?.push(result.data);
            })
          );
        } catch (error) {
          console.log("querryfullfilled error");
        }
      }, 
      // pessimistic add end
      // ______________________________
    }),

    updateTask: builder.mutation({
      query: ({ selectedTaskId, updatedStatus }) => ({
        url: `/tasks/${selectedTaskId}`,
        method: "PATCH",
        body: updatedStatus,
      }),
// ______________________________
      // pessimistic add start
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("update result selectedTaskId updatedStaus", args)
          const selectedTaskId = args.selectedTaskId;
          const updatedStatus = args.updatedStatus.status;
          console.log("updatedStaus",updatedStatus)
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              const updatedTask = draft.find((item) => item.id == selectedTaskId)
              updatedTask.status = updatedStatus
              //  console.log(JSON.stringify(draft)) 
              //  console.log(JSON.stringify(updatedTask))
              // updatedTask.status = updatedStatus
            })
          );

        } catch (error) {
          console.log("querryfullfilled error");
        }
      }, 
      // pessimistic add end
      // ______________________________

    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation } =
  tasksApi;
