import * as dotenv from "dotenv"
import * as path from 'path';
import * as Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object().keys({
  ENV: Joi.string().required().valid('production', 'development', 'staging', 'test'),

  PORT: Joi.string().required(),

  FRONTEND_URL: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  SECRET_KEY: Joi.string().required(),

  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required()
})
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.ENV,
  port: envVars.PORT,
  frontendUrl: envVars.FRONTEND_URL,
  secretkey: envVars.SECRET_KEY,
  awsAccess: {
    accessKeyId: envVars.S3_ACCESS_KEY_ID,
    secretAccessKey: envVars.S3_SECRET_ACCESS_KEY
  }
};
