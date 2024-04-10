import { IconButton, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { ChromePicker } from 'react-color';
import { ColorPickerIcon } from './color-picker-icon.tsx';

export type ColorPickerProps = {
    color: string;
    onColorChange: (newColor: string) => void;
};

export function ColorPickerPopup({ color, onColorChange }: ColorPickerProps) {
    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <IconButton
                    aria-label="ColorPicker"
                    w={'40px'}
                    h={'15px'}
                    transform="translate(-50%, -50%)"
                    top={'50%'}
                    left={'10%'}
                    position={'absolute'}
                    bg={'none'}
                    _hover={{}}
                    _active={{}}
                    icon={<ColorPickerIcon />}
                />
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.200" borderColor="blue.200">
                <PopoverCloseButton />
                <PopoverBody ml={7}>
                    <ChromePicker color={color} onChange={(newColor) => onColorChange(newColor.hex)} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
