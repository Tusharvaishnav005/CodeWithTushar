require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router= require("./router/auth-router")
const connectDb= require("./utils/db")
// const validate = require("./middlewares/validate-middleware")
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const Service = require("./models/service-model");

// const corsOptions = {
//   origin: "http://localhost:5173", 
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      "http://localhost:5173",
      "https://code-with-tushar.vercel.app",
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors);
app.use(express.json());

app.use("/api/auth",router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to my Server");
// });

// app.get("/register", (req, res) => {
//   res.status(200).json({ msg: "registration successful" });
// });
app.use(errorMiddleware);
const PORT = 5000;
connectDb().then(()=>{
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
})
