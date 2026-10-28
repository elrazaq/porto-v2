export default async function handler(req, res) {
  try {
    const { bootstrapServerless } = await import('../apps/api/dist/serverless.js');
    const app = await bootstrapServerless();
    return app(req, res);
  } catch (err) {
    console.error('SERVERLESS_BOOTSTRAP_ERROR:', err);
    return res.status(500).json({
      message: 'Serverless execution failed',
      error: err.message,
      code: err.code,
      stack: err.stack,
    });
  }
}
