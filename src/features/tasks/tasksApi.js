import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getTasks: builder.query({
      query: () => {
        return "/tasks";
      },
    }),
    getTask: builder.query({
      query: (id) => {
        return `/tasks/${id}`;
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

    updateTaskStatus: builder.mutation({
      query: ({ selectedTaskId, updatedStatus }) => ({
        url: `/tasks/${selectedTaskId}`,
        method: "PATCH",
        body: updatedStatus,
      }),
      // ______________________________
      // pessimistic update start
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; 
          const selectedTaskId = args.selectedTaskId;
          const updatedStatus = args.updatedStatus.status;
          console.log("updatedStaus", updatedStatus);
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              const updatedTask = draft.find(
                (item) => item.id == selectedTaskId
              );
              updatedTask.status = updatedStatus; 
            })
          );
        } catch (error) {
          console.log("querryfullfilled error");
        }
      },
      // pessimistic update end
      // ______________________________
    }),

    updateTask: builder.mutation({
      query: ({ selectedTaskId, updatedData }) => ({
        url: `/tasks/${selectedTaskId}`,
        method: "PATCH",
        body: updatedData,
      }),
      // ______________________________
      // pessimistic update start
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("update args", args)  
          console.log("update args.updatedData.taskName", args.updatedData.taskName)  
          // console.log("update args selectedTaskId", args.selectedTaskId)  
          // console.log("update args updatedData", args.updatedData)  
          // console.log("update result", result)  
          // console.log("update result data", result.data)  
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
       
              const singleUpdatedTask = draft.find((item)=> item.id == args.selectedTaskId)
              singleUpdatedTask.taskName = args.updatedData.taskName;
              singleUpdatedTask.status = args.updatedData.status;
              singleUpdatedTask.deadline = args.updatedData.deadline;

              singleUpdatedTask.project.id = args.updatedData.project.id; 
              singleUpdatedTask.project.projectName = args.updatedData.project.projectName; 
              singleUpdatedTask.project.colorClass = args.updatedData.project.colorClass;

              singleUpdatedTask.teamMember.id = args.updatedData.teamMember.id; 
              singleUpdatedTask.teamMember.avatar = args.updatedData.teamMember.avatar; 
              singleUpdatedTask.teamMember.name = args.updatedData.teamMember.name;
   
            })
          );
        } catch (error) {
          console.log("querryfullfilled error");
        }
      },
      // pessimistic update end
      // ______________________________
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE", 
      }),
      // ______________________________
      // optimistic delete start
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
             return draft.filter((item)=> item.id !== args)
          })
        );
        
      },

      // ______________________________
      // optimistic delete end

       // ______________________________
      // pessimistic delete start
      // async onQueryStarted(args, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     console.log("deleted task", args)
          
      //     dispatch(
      //       apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //          return draft.filter((item)=> item.id !== args)
      //       })
      //     );
      //   } catch (error) {
      //     console.log("querryfullfilled error");
      //   }
      // },
      // pessimistic delete end
      // ______________________________
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = tasksApi;
