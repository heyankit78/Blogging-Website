import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';  // Using bcryptjs for password hashing
import { sign ,verify} from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
// import {user}

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route('api/v1/user',userRouter);
app.route('api/v1/blog',blogRouter);
// Middleware for JWT validation on blog routes
// app.use('/api/v1/blog/*', async (c, next) => {
//   const header = c.req.header('authorization') || '';
  
//   if (!header) {
//     c.status(401);
//     return c.json({ error: 'Unauthorized: No token provided' });
//   }

//   try {
//     // Use the correct secret for verifying the JWT
//     const response = await verify(header, c.env.JWT_SECRET);

//     if (response?.id) {
//       // Valid token, proceed to the next middleware/route
//       return next();
//     } else {
//       c.status(403);
//       return c.json({ error: 'Unauthorized: Invalid token' });
//     }
//   } catch (error) {
//     c.status(403);
//     return c.json({ error: 'Unauthorized: Token verification failed' });
//   }
// });

export default app;
