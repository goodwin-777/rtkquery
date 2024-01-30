import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';


const pause = (time)=>{
    return new Promise(resolve => setTimeout(resolve, time));
}
const albumsApi = createApi({
    reducerPath : 'albums',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:3005/',
        fetchFn : async (...args)=> {
            await pause(400)
            return fetch(...args)
        }
    }),
    endpoints : (builder)=>{
        return{
            fetchAlbums : builder.query({
                providesTags : (albums, error, user)=>{
                    const tags = albums.map(album =>{
                        return {type : 'album', id : album.id}
                    })
                    tags.push({type : 'userAlbum', id : user.id})
                    return tags;
                },
                query : (user)=>{
                    return {
                        url : '/albums',
                        params : {
                            userId : user.id
                        },
                        method : 'GET'
                    }
                }
            }),

            postAlbum : builder.mutation({
                invalidatesTags : (result, error, user)=>{
                    return [{type: 'userAlbum', id : user.id}]
                },
                query : (user)=>{
                    console.log(user);
                    return{
                        url : '/albums',
                        body : {
                            title : faker.commerce.productName(),
                            userId : user.id
                        },
                        method : 'POST'
                    } 
                }
            }),

            deleteAlbum : builder.mutation({
                invalidatesTags : (result, error, album)=>{
                    return [{type : 'album', id : album.id}]
                },
                query : (album)=>{
                    console.log(album);
                    return {
                        url : `/albums/${album.id}`,
                        method : 'DELETE'
                    }
                }
            })
        }
    }
})

export const {useFetchAlbumsQuery, usePostAlbumMutation, useDeleteAlbumMutation} = albumsApi;
export {albumsApi};