import { useEffect, useState } from 'react';

export function useLocalStorage<TValue>(
    initialValue: TValue,
    key: string
): [value: TValue, setValue: React.Dispatch<React.SetStateAction<TValue>>] {
    const getValue = () => {
        const storage = localStorage.getItem(key);

        if (storage) {
            return JSON.parse(storage);
        }

        return initialValue;
    };

    const [value, setValue] = useState<TValue>(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
