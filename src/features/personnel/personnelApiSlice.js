import { apiSlice } from "../../app/api/apiSlice";

export const personnelApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        createPersonnel: builder.mutation({
            query: (credentials) => ({
                url: "/personnel",
                method: "POST",
                body: {...credentials}
            })
        }),
        updatePersonnel: builder.mutation({
            query: (credentials)=>({
                url: `/personnel/${credentials.id}`,
                method: "PUT",
                body: {...credentials}
            })
        }),
        deletePersonnel: builder.mutation({
            query: (credentials)=>({
                url: `/personnel/${credentials.id}`,
                method: "DELETE",
                body: {...credentials}
            })
        }),
        getPersonnels: builder.query({
            query: ()=> "/personnel"
        }),
        getPersonnel: builder.query({
            query: (id)=> `/personnel/${id}`
        })
    })
})

export const  {
   useCreatePersonnelMutation,
   useUpdatePersonnelMutation,
   useDeletePersonnelMutation,
   useGetPersonnelsQuery,
   useGetPersonnelQuery,
} = personnelApiSlice;