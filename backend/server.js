import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

const app = express(); 
app.use(express.urlencoded({ extended: true })); //allow to accept url encoded data in body
app.use(express.json()); //allow to accept json data in body

app.use("/api/products", productRoutes)

app.listen(5000, () => {
    connectDB();
  console.log('Server is running on port 5000');
});