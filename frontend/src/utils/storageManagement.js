export const setInStorage = (key, value) => {
    if(typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
};

export const getKeyInStorage = (key) => {
    return typeof window != 'undefined' ? window.localStorage.getItem(key) : null;
};

export const isInStorage = (key) => {
    return typeof window != 'undefined'
        ? !!window.localStorage.getItem(key)
        : false;
};

export const removeFromStorage = (key) => {
    if(typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
};
