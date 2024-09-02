interface EnvConfig {
  PORT: string | undefined;
  MONGO_URI: string | undefined;
  NODE_ENV: string | undefined;
  ACCESS_TOKEN_SECRET: string | undefined;
  ACCESS_TOKEN_EXPIRE_IN: string | undefined;
  STRIPE_SECRET_KEY: string | undefined;
}

const _envConfig: EnvConfig = {
  PORT: process.env.PORT || "5080",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_IN: process.env.ACCESS_TOKEN_EXPIRE_IN,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

const envConfig = {
  get(key: keyof EnvConfig) {
    const value = _envConfig[key];

    if (!value) {
      console.error(`No environment variable found with key ${key}.`);
      process.exit(1);
    }
    return value;
  },
};

export default envConfig;
