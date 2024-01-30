import React, { useState } from 'react'
import { FaMinus } from 'react-icons/fa';
import Button from './Button';

import { useDeletePhotoMutation } from '../store'

function PhotosListItem({photo}) {
    const [showDelete, setShowDelete] = useState(false);

    const [deletePhoto, {isLoading, isError}] = useDeletePhotoMutation();

    const handleDelete = ()=>{
        console.log(photo);
        deletePhoto(photo);
    }
    const handleMouseEnter = ()=>{
        setShowDelete(true);
    }
    const handleMouseLeave = ()=>{
        setShowDelete(false);
    }

  return (
    <div className='relative m-5'>
        {isError ? 'error deleting photo' : <img key={photo.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} src={photo.url} alt={'randomImage'} className='w-52 h-40'/>}
        {showDelete && <div className='absolute top-0 right-0 text-2xl opacity-100'><Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  rounded className='text-red-500' loading={isLoading} onClick={handleDelete}><FaMinus/></Button></div>}
    </div>
  )
}

export default PhotosListItem