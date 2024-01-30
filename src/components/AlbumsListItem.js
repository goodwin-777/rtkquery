import React from 'react'
import { FaMinus } from 'react-icons/fa';
import { useDeleteAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

function AlbumsListItem({item}) {
    const [deleteAlbum, {isLoading, isError}] = useDeleteAlbumMutation();

    const handleDelete = ()=>{
        deleteAlbum(item);
    }

    const header = (
        <>
            <Button rounded className='text-red-600' loading={isLoading} onClick={handleDelete}><FaMinus/></Button>
            {isError ? "error deleting user" : <div className={`${isError && 'text-red-500'} text-white`}>{item.title}</div>}
        </>
    )

    return (
        <ExpandablePanel header={header} className={'mb-3 bg-gray-500 border-gray-500'} fontSize={'text-2xl'}> 
            <PhotosList album={item}/>
        </ExpandablePanel>
    )
}

export default AlbumsListItem