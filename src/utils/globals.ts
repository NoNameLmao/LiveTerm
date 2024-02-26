let currentPath = '/';

export const getCurrentPath = () => currentPath;
export const setCurrentPath = (path: string) => {
    currentPath = path;
};
