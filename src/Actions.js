export const inAction = () => async value => {
    value({
        type: "INCREMENT",
    });
};

export const DeAction = () => async value => {
    value({
        type: "Decrement",
    });
};
