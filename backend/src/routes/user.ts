import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import bcrypt from 'bcryptjs';  // Using bcryptjs for password hashing
import { sign ,verify} from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signupInput } from "@heyankit/medium-common-module";


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();;

// Signup route with password hashing
userRouter.post('/signup', async (c) => {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Invalid inputs"
        })
    }
    // Check if user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
  
    if (existingUser) {
      return c.json({ error: 'User already exists' }, { status: 400 });
    }
  
    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(body)
    // Create a new user with hashed password
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name || '',  // Optional name, empty string if not provided
        password: hashedPassword,  // Store hashed password
      },
    });
  
    // Sign the JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);  
  
    return c.json({
      jwt: token,
    });
  });
  
  // Signin route 
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    // Find the user by email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
  
    if (!existingUser) {
      return c.json({ error: 'User does not exist' }, { status: 403 });
    }
  
    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
  
    if (!isPasswordValid) {
      return c.json({ error: 'Invalid password' }, { status: 403 });
    }
  
    // Sign the JWT token
    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token,
    });
  });