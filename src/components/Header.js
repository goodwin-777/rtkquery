import { useEffect } from 'react';
import Button from './Button';

function Header({postItemLoading, usePostItemMutation, title, item, className}){
    const [postItem, {isLoading ,isError}] = usePostItemMutation();

    useEffect(()=>{
        postItemLoading(isLoading);
    }, [postItemLoading, isLoading]) 

    const handleItemCreate = ()=>{
        console.log(item);
        postItem(item);
    }
    
    return (
        <div className={`flex flex-row justify-between ${className}`}>
            <h1 className={title==='Users' ? "text-6xl" : "text-3xl"}>{title}</h1>
            <Button loading={isLoading} onClick={handleItemCreate} className={'h-10 self-center bg-green-500 rounded-md text-white float-end'}>
                + Add {title}
            </Button>
            {isError && "something went wrong"}
        </div>
    )
}

export default Header;