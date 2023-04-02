//-- Handle error middleware

const asyncHandle = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

module.exports = {
    asyncHandle
};
