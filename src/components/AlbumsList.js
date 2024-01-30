import React, { useState } from 'react';
import { useFetchAlbumsQuery, usePostAlbumMutation } from '../store';
import Header from './Header';
import AlbumsListItem from './AlbumsListItem';
import Skeleton from './Skeleton';

function AlbumsList({user}) {
    
    const {data, isLoading, error} = useFetchAlbumsQuery(user);
    const[isPostAlbumLoading, setIsPostAlbumLoading] = useState(false);

    let content;

    const handlePostAlbumLoading = (boolean)=>{
        setIsPostAlbumLoading(boolean);
    }
    
    if(isLoading){
        content = <Skeleton times={2} className='h-16 w-full'/>;
    }
    else if(!isLoading && (error==null)){
        content = data.map(item =>  <AlbumsListItem key={item.id} item={item}/>)
    }
    else{
        content = <div>error loading albums...</div>
    }
  return (
    <div className='mx-10 bg-gray-400 rounded p-5 pb-2'>
        <Header postItemLoading={handlePostAlbumLoading} usePostItemMutation={usePostAlbumMutation} title={'Albums'} item={user} className=' p-5 mb-3 sticky top-20 z-20 bg-gray-400'/>
        <div className='m-2'>
            {content}
            {isPostAlbumLoading && <Skeleton className={'h-16 w-full'} times={1}/>}
        </div>
    </div>
  )
}

export default AlbumsList