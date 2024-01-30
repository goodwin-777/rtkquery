import Skeleton from "./Skeleton";
import Header from './Header';
import UsersListItem from './UsersListItem';
import { useFetchUsersQuery, usePostUserMutation } from "../store";
import { useState } from "react";

export default function Userslist(){
    const {data, isLoading, error} = useFetchUsersQuery();
    const[isPostUserLoading, setIsPostUserLoading] = useState(false);

    let content;

    const postUserLoading = (boolean)=>{
        setIsPostUserLoading(boolean);
    }
    
    if(isLoading){
        content = <Skeleton times={8} className='h-16 w-full'/>;
    }
    else if(!isLoading && (error==null)){
        content = data.map(item =>  <UsersListItem key={item.id} item={item}/>)
    }
    else{
        content = <div>error loading users...</div>
    }

    return (
        <>
        <div className="container mx-auto pb-5 min-h-screen bg-white">
            <Header postItemLoading={postUserLoading} usePostItemMutation={usePostUserMutation} title={'Users'} className='p-3 mb-5 fixed mx-2 top-0 right-16 left-16 bg-white z-50'/>
            <div className="m-5 mt-28">
            {content}
            {isPostUserLoading && <Skeleton className={'h-16 w-full'} times={1}/>}
            </div>
        </div>
        </>
    )

};