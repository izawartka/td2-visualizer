export const readEnvString = (key) => {
    return import.meta.env[key];
};

export const readEnvBool = (key) => {
    const value = import.meta.env[key];
    switch(value) {
        case "true": return true;
        case "false": return false;
        default: return null;
    }
};
