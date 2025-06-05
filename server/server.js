import express from 'express';
import connect from './src/db/connect.js';
import dotenv from "dotenv";
import cors from "cors";
import locationRoutes from './src/routes/locationRoute.js';
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); 
app.use('/api/locations', locationRoutes);

// routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file)=>{
    // use dyanamic routing 
    import (`./src/routes/${file}`).then((route)=>{
        app.use("/api/v1", route.default);
    }).catch((error)=> {
        console.log("Failed to load route file", error)
    })
})

const server = async () => {
    try {

        await connect();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
        
    } catch (error) {
         console.log("Failed connecting to server",error);
    }
}

server();