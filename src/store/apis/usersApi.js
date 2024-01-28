import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {faker} from '@faker-js/faker'

const pause = (time)=>{
    return new Promise(resolve => setTimeout( resolve, time))
}
const usersApi = createApi({
    reducerPath : 'users',
    baseQuery : fetchBaseQuery({
        fetchFn : async(...args)=>{
            await pause(300)
            return fetch(...args)
        },
        baseUrl : 'http://localhost:3005/'
    }),
    endpoints : (builder)=>{
        return{            
            fetchUsers : builder.query({
                providesTags : ['user'],
                query : ()=>{
                    return {
                        url : '/users',
                        method : 'GET',
                    }
                }
            }),

            postUser : builder.mutation({
                invalidatesTags : ['user'],
                query : ()=>{
                    return{
                        url : "/users",
                        body : {
                            name : faker.person.fullName()
                        },
                        method : 'POST'
                    }
                }
            }),

            deleteUser : builder.mutation({
                invalidatesTags : ['user'],
                query : (user)=>{
                    return {
                        url : `users/${user.id}`,
                        method : 'DELETE'
                    }
                }
            })
        }
    }
})

export const {useFetchUsersQuery, usePostUserMutation, useDeleteUserMutation } = usersApi;
export {usersApi};