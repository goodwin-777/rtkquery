import { faker } from '@faker-js/faker';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const pause = (time)=>{
    return new Promise(resolve=> setTimeout(resolve, time))
}
const photosApi = createApi({
    reducerPath : "photos",
    baseQuery : fetchBaseQuery({
        fetchFn : async (...args)=>{
            await pause(300);
            return fetch(...args);
        },
        baseUrl : "http://localhost:3005"
    }),
    endpoints : (builder)=>{
        return {
            fetchPhotos : builder.query({
                providesTags : (result, error, album)=>{
                    const tags = result.map(photo => {
                        return {type : 'photo', id : photo.id}
                    })
                    tags.push({type : 'albumPhoto', id : album.id})
                    return tags;
                },  
                query : (album)=>{
                    return {
                        url : '/photos',
                        method : 'GET',
                        params : {
                            albumId : album.id
                        }
                    }
                }
            }),

            postPhotos : builder.mutation({
                invalidatesTags : (result, error, album)=>{
                    return [{type : 'albumPhoto', id : album.id}]
                },
                query : (album)=>{
                    console.log(album.id);
                    return {
                        url : '/photos',
                        body : {
                            albumId : album.id,
                            url : faker.image.url(150, 150, true),
                        },
                        method :'POST'
                    }

                }
            }),

            deletePhoto : builder.mutation({
                invalidatesTags: (result, error, photo)=>{
                    return [{type : 'photo', id : photo.id}]
                },
                query : (photo)=>{
                    return {
                        url : `/photos/${photo.id}`,
                        method : 'DELETE'
                    }
                }
            })
        }
    }
})
console.log(faker.image.url(150, 150, true));

export const {useFetchPhotosQuery, usePostPhotosMutation, useDeletePhotoMutation} = photosApi;
export {photosApi};