interface EnvConfig {
  PORT: string | undefined;
  MONGO_URI: string | undefined;
  NODE_ENV: string | undefined;
}

const _envConfig: EnvConfig = {
  PORT: process.env.PORT || "5090",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
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
