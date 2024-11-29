import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        createUser: builder.mutation({
            query: (credentials) => ({
                url: "/user",
                method: "POST",
                body: {...credentials}
            })
        }),
        updateUser: builder.mutation({
            query: (credentials)=>({
                url: `/user/${credentials.id}`,
                method: "PUT",
                body: {...credentials}
            })
        }),
        deleteUser: builder.mutation({
            query: (credentials)=>({
                url: `/user/${credentials.id}`,
                method: "DELETE",
                body: {...credentials}
            })
        }),
        getUsers: builder.query({
            query: ()=> "/user"
        }),
        getUser: builder.query({
            query: (id)=> `/user/${id}`
        })
    })
})

export const  {
   useCreateUserMutation,
   useUpdateUserMutation,
   useDeleteUserMutation,
   useGetUsersQuery,
   useGetUserQuery
} = userApiSlice;