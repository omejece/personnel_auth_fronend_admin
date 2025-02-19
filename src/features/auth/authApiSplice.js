
import {apiSlice} from "../../app/api/apiSlice";

export const authApiSplice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: credentials =>({
                url: "/auth/login",
                method: "POST",
                body: {...credentials}
            })
        }),

    })
});

export const {
    useLoginMutation
} = authApiSplice;