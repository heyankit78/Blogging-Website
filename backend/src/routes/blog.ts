import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { sign ,verify} from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogInput,updateBlogInput } from "@100xdevs/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables:{
        userId:string
    }
  }>();



  blogRouter.use("/*",async(c,next) => {
    console.log("entering middleware")
    const authHeader = c.req.header('authorization') || "";
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);
        console.log("user---",user)
        if(user){
          // @ts-ignore
            c.set('userId',user.id);
            await next();
        }
        else{
            c.status(403);
            return c.json({
                message:"You are not logged in!"
            })
        }
    }catch(e){
        c.status(411);
        return c.json({
            message:"You are not logged in!"
        })
    }

  });
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const blog = await prisma.post.findMany({});
      return c.json({blog});
  })

  // Create a new blog
  blogRouter.post('/', async(c) => {
    console.log("entering created")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());


      const userId = c.get('userId');
      
      const body = await c.req.json();
      const { success } = createBlogInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Invalid inputs"
          });
      }
      const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            published:body.published,
            authorId:userId
        },
      })
      return c.json({
        id : blog.id
      })
  });

  // Get a single blog
  blogRouter.get(':id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    const id = c.req.param('id');
    
    const blog = await prisma.post.findUnique({
        where:{
            id
        }
    })
    return c.json({
        blog
    })
  });
  
  
  
  // Update an existing blog
  blogRouter.put('/', async(c) => {
    console.log("i am into update");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
   
      const userId = c.get('userId');
      const body = await c.req.json();
      const { success } = updateBlogInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Invalid inputs"
          });
      }
      console.log("body-------------",body);
      const post = await prisma.post.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            content:body.content
        }
      })  
      console.log(post);
      return c.text("updated post")
  });
  
