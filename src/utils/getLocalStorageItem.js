const getLocalStorageItem = (key, isParseable = false) => {
    try {
        const data = localStorage.getItem(key);
        return isParseable ? JSON.parse(data) : data
    } catch {
        return null;
    }
};

export default getLocalStorageItem;