require('dotenv').config();
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import { eq } from 'drizzle-orm';
import { db } from './db/db';
import { user } from './db/schema-compiled';

import { comparePassword } from './utils/bcrypt-hash';
import { signToken, verifyToken, SignedPayload } from './utils/jwt';

const app = new Koa();
const router = new Router({ prefix: '/api' });

router.get('/test', async (ctx) => {
  console.log('[LOG] X-Forwarded-For:', ctx.headers['x-forwarded-for'])
  ctx.body = 'Able to connect to the koa server!'
});

router.post('/refresh-token', async (ctx) => {
  const issuedToken = ctx.cookies.get('refresh-token')
  const { username, password: plainPassword } = ctx.request.body as { username: string, password: string };

  if(issuedToken) {
    try {
      verifyToken(issuedToken)

      ctx.status = 400
      ctx.body = { error: 'User is already logged in with one account on this browser' }
      return
    } catch { console.log('invalid token') }
  }

  const result = (await db.select().from(user).where(eq(user.username, username)))[0];

  if(!result) {
    ctx.status = 401
    ctx.body = { error: 'Invalid username or password' }
    return
  }

  const match = await comparePassword(plainPassword, result.password)

  if(!match) {
    ctx.status = 401
    ctx.body = { error: 'Invalid username or password' }
    return
  }

  const payload = {
    id: result.id,
    username: result.username,
    name: result.name,
    type: 'refresh-token',
  }
  
  const token = signToken(payload)

  ctx.cookies.set('refresh-token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60,
    path: '/',
  });

  ctx.status = 200
})

router.get('/access-token', async (ctx) => {
  const issuedToken = ctx.cookies.get('refresh-token')

  if(!issuedToken) {
    ctx.status = 401
    ctx.body = { error: 'no token' }
    return
  }

  try {
    const decodedPayload = verifyToken(issuedToken) as SignedPayload
    const { id, username, name, type } = decodedPayload

    if(type != 'refresh-token') { throw '' }

    const user = {
      id,
      username,
      name,
      type: 'access-token',
    }

    const accessToken = signToken(user, '10m')

    console.log({ accessToken })
    ctx.body = { token: accessToken }
  } catch {
    ctx.status = 401
    ctx.body = { error: 'invalid token' }
    return
  }
})

router.get('/me', async (ctx) => {
  const token = ctx.cookies.get('refresh-token')

  if(!token) {
    ctx.status = 401
    ctx.body = { error: 'No token' }
    return
  }
  
  try {
    const payload = verifyToken(token) as SignedPayload
    console.log(new Date(payload.iat * 1000))
    console.log(new Date(payload.exp * 1000))
    ctx.body = { payload }
  } catch(err) {
    ctx.status = 401
    ctx.body = { error: 'invalid token' }
    return
  }
})

app.proxy = true;
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const port = Number(process.env.API_PORT);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});