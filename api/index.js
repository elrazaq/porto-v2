import { bootstrapServerless } from '../apps/api/dist/serverless.js';

export default async function handler(req, res) {
  const app = await bootstrapServerless();
  return app(req, res);
}

