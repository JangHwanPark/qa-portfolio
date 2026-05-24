import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3001);
const app = createApp();

app.listen(port, () => {
  console.log(`api-playground listening on http://localhost:${port}`);
  console.log(`swagger docs:           http://localhost:${port}/docs`);
});
