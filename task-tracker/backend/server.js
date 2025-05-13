import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../backend/routes/auth.routes.js';
import projectRoutes from '../backend/routes/project.routes.js';
import taskRoutes from '../backend/routes/task.routes.js';


dotenv.config();
const app = express();

app.use(cors
  ({ 
   
  origin: process.env.FRONTEND,
  credentials: true

   }));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
