import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apis/usersApi";
import {albumsApi} from "./apis/albumsApi"
import {setupListeners} from '@reduxjs/toolkit/query';


const store = configureStore({
    reducer : {
        [usersApi.reducerPath] : usersApi.reducer,
        [albumsApi.reducerPath] : albumsApi.reducer
    },
    middleware : (gdm)=>{
        return gdm().concat(usersApi.middleware);
    }
})

setupListeners(store.dispatch);

export {store};
export {useFetchUsersQuery, usePostUserMutation, useDeleteUserMutation } from './apis/usersApi';
export { useFetchAlbumsQuery} from './apis/albumsApi'