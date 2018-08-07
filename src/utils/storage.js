export function setData(key, values) {
    window.localStorage.setItem(key, values);
}

export function getData(key) {
    return window.localStorage.getItem(key);
}

export function removeData(key) {
    window.localStorage.removeItem(key);
}
