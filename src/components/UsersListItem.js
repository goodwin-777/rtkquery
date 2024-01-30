import Button from './Button';
import { FaMinus } from "react-icons/fa";
import ExpandablePanel from './ExpandablePanel';
import { useDeleteUserMutation } from '../store';
import AlbumsList from './AlbumsList';

function UsersListItem({item}) {
    const [deleteUser, {isLoading, isError}] = useDeleteUserMutation();

    const handleDelete = ()=>{
        deleteUser(item);
    }

    const header = (
        <>
            <Button rounded className='text-red-500' loading={isLoading} onClick={handleDelete}><FaMinus/></Button>
            {isError  ? "error deleting user" : <div>{item.name}</div>}
        </>
    )

    return (
        <ExpandablePanel header={header} className={'mb-7 bg-gray-100'} fontSize={'text-4xl'}>
            <AlbumsList  user={item}/>
        </ExpandablePanel>
    )
}

export default UsersListItem