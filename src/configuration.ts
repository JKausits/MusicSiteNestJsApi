export interface JwtConfiguration {
  secret: string;
  expiryInMinutes: number;
}

export interface DefaultUserConfiguration {
  email: string;
  password: string;
}

export interface EnvironmentConfiguration {
  port: number;
  corsOrigins: string[];
  jwt: JwtConfiguration;
  defaultUser: DefaultUserConfiguration;
}

export default (): EnvironmentConfiguration => ({
  port: parseInt(process.env.PORT) || 3000,
  corsOrigins: process.env.CORS_ORIGINS.split(','),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiryInMinutes: parseInt(process.env.JWT_EXPIRY_MINUTES) || 60,
  },
  defaultUser: {
    email: process.env.DEFAULT_USER_EMAIL,
    password: process.env.DEFAULT_USER_PASSWORD,
  },
});
