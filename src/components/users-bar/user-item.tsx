import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, Circle, IconButton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '~/hooks';
import { User } from '~/models';
import { userSlice } from '~/store';

export type UserItemProps = {
    totalUsersCount: number;
} & User;

export function UserItem({ id, name, picture, totalUsersCount }: UserItemProps) {
    const [isCloseIconVisible, setIsCloseIconVisible] = useState(false);
    const dispatch = useAppDispatch();
    return (
        <Tooltip label={name.first + ' ' + name.last}>
            <Circle
                position={'relative'}
                onMouseEnter={() => setIsCloseIconVisible(true)}
                onMouseLeave={() => setIsCloseIconVisible(false)}>
                <IconButton
                    aria-label="Remove user"
                    icon={<CloseIcon h="20px" w={'20px'} />}
                    size={'sm'}
                    position={'absolute'}
                    zIndex={'1000'}
                    bg={'lightgrey'}
                    borderRadius={'full'}
                    opacity={0.7}
                    visibility={isCloseIconVisible ? 'visible' : 'hidden'}
                    onClick={() => {
                        if (totalUsersCount > 1) dispatch(userSlice.actions.removeUser({ id }));
                        else alert("You can't remove users, because you must have less then 1 user.");
                    }}
                />
                <Avatar size={'sm'} src={picture.thumbnail} />
            </Circle>
        </Tooltip>
    );
}
