import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/api/test', async (ctx) => {
  ctx.body = 'Able to connect to koa server!';
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});