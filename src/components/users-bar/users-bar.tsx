import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { userSlice } from '~/store';
import { UserItem } from './user-item.tsx';

export function UsersBar() {
    const users = useAppSelector((e) => e.userReducer.users);
    const dispatch = useAppDispatch();
    return (
        <>
            {users.map((user) => (
                <UserItem key={user.id} totalUsersCount={users.length} {...user} />
            ))}

            <IconButton
                icon={<AddIcon />}
                size="sm"
                aria-label="Add user"
                onClick={() => {
                    if (users.length < 10) {
                        dispatch(userSlice.actions.fetchUser());
                    } else alert("You can't add more users because the count of them can't be greater than 10.");
                }}
            />
        </>
    );
}
