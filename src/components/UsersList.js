import Skeleton from "./Skeleton";
import Header from './Header';
import UsersListItem from './UsersListItem';
import { useFetchUsersQuery } from "../store";
import { useState } from "react";

export default function Userslist(){
    const {data, isLoading, error} = useFetchUsersQuery();
    const[isPostUserLoading, setIsPostUserLoading] = useState(false);

    let content;

    const postUserLoading = (boolean)=>{
        setIsPostUserLoading(boolean);
    }
    
    if(isLoading){
        content = <Skeleton times={14} className='h-16 w-full'/>;
    }
    else if(!isLoading && (error==null)){
        content = data.map(item =>  <UsersListItem key={item.id} item={item} />)
    }
    else{
        content = <div>error loading users...</div>
    }

    return (
        <>
            <Header postUserLoading={postUserLoading}/>
            {content}
            {isPostUserLoading && <Skeleton className={'h-16 w-full'} times={1}/>}
        </>
    )

};