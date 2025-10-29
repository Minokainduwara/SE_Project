import express from "express";
import { PORT } from "./config/env.js";
const app = express();

app.get('/', (req, res) => {
    res.send('Grocery System API is Running');
});    

app.listen(PORT, () =>{
    console.log(`Grocery App API is running on : http://localhost:${ PORT }`);
});

export default app;