

export const setItemToLS = (key: string, value: any) => {
   localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLS= (key: string): string | undefined => {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
};