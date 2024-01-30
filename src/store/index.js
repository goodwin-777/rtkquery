import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apis/usersApi";
import {albumsApi} from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import {setupListeners} from '@reduxjs/toolkit/query';


const store = configureStore({
    reducer : {
        [usersApi.reducerPath] : usersApi.reducer,
        [albumsApi.reducerPath] : albumsApi.reducer,
        [photosApi.reducerPath] : photosApi.reducer
    },
    middleware : (gdm)=>{
        return gdm()
        .concat(usersApi.middleware)
        .concat(albumsApi.middleware)
        .concat(photosApi.middleware);
    }
})

setupListeners(store.dispatch);

export {store};
export {useFetchUsersQuery, usePostUserMutation, useDeleteUserMutation } from './apis/usersApi';
export {useFetchAlbumsQuery, usePostAlbumMutation, useDeleteAlbumMutation} from './apis/albumsApi';
export {useFetchPhotosQuery, usePostPhotosMutation, useDeletePhotoMutation} from './apis/photosApi';