import express from "express";
import cookie from "cookie-parser";
import AuthRoute from "./routes/user.route.js";
import RoleRoute from "./routes/role.route.js";
import awsRoute from "./routes/aws.route.js";

const app = express()
app.use(express.json())
app.use(cookie());

app.use("/api/auth",AuthRoute);
app.use("/api/role",RoleRoute);
app.use("/api/aws",awsRoute);


export default app;