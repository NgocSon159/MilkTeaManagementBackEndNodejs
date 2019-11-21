const env = process.env.NODE_ENV || 'development';

const config = {
    DOMAIN: 'localhost',
    HTTP_PORT: 3003,
    SOCKET_PORT: 3500,
    MONGO: {
        URL: 'mongodb://localhost:27017',
        DB: 'MilkTea',
        POOL_SIZE: 5,
    },
    SECRET_KEY: 'milkTea'
};

export default config;
