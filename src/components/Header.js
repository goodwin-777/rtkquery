import { useEffect } from 'react';
import { usePostUserMutation } from '../store';
import Button from './Button';

function Header({postUserLoading}){
    const [postUser, {isLoading ,isError}] = usePostUserMutation();
   
    useEffect(()=>{
        postUserLoading(isLoading);
    }, [postUserLoading, isLoading]) 

    const handleUserCreate = ()=>{
        postUser();
    }
    
    return (
        <div className="flex flex-row justify-between m-3">
            <h1 className="text-6xl m-2">Users</h1>
            <Button loading={isLoading} onClick={handleUserCreate} className={'h-10 self-center bg-green-500 rounded-md text-white'}>
                + Add user
            </Button>
            {isError && "something went wrong"}
        </div>
    )
}

export default Header;