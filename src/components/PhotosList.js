import React, { useState } from 'react'
import { useFetchPhotosQuery, usePostPhotosMutation } from '../store'
import Header from './Header';
import PhotosListItem from './PhotosListItem';
import Skeleton from './Skeleton';


function PhotosList({album}) {
    const {data, isLoading, isError} = useFetchPhotosQuery(album);
    const [isPostingPhotoLoading, setIsPostingPhotoLoading] = useState(false);

    console.log(data);
    let content;

    if(isLoading){
        content = <Skeleton times={6} className='w-52 h-40' />
    }
    else if(isError){
        content = <p>Error fetching Photos</p>
    }
    else{
        content = data.map(photo => {
            return <PhotosListItem key={photo.id} photo={photo} />
        })
    }

  return (
    <>
        <Header postItemLoading={setIsPostingPhotoLoading} usePostItemMutation={usePostPhotosMutation} title={'Photos'} item={album} className='p-5 sticky top-40 z-10 text-white bg-gray-500'/>
        <div className='flex flex-row flex-wrap'>
            {content}
            {isPostingPhotoLoading && <Skeleton times={1} className='h-40 w-52 m-5' />}
        </div>
    </>
  )
}

export default PhotosList