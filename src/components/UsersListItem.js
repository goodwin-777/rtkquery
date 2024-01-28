import Button from './Button';
import { FaMinus } from "react-icons/fa";
import ExpandablePanel from './ExpandablePanel';
import { useDeleteUserMutation } from '../store';

function UsersListItem({item}) {
    const [deleteUser, {isLoading, isError}] = useDeleteUserMutation();

    const handleDelete = ()=>{
        deleteUser(item);
    }

    const header = (
        <div className='flex flex-row justify-between'>
            <Button rounded className='text-red-500' loading={isLoading} onClick={handleDelete}><FaMinus/></Button>
            {item.name}
            {isError  && "error deleting user"}
        </div>
    )

    return (
        <ExpandablePanel header={header} className={'mb-3'}>
            List of albums
        </ExpandablePanel>
    )
}

export default UsersListItem