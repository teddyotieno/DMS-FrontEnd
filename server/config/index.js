var envVariables = {
    secretKey: process.env.SECRET_KEY,
    db: {
        url: process.env.DB_URL
    }
};

module.exports = {
    development: envVariables,
    staging: envVariables,
    production: envVariables,
    test: envVariables
};
