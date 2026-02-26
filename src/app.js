import express from "express"
import cookie from "cookie-parser"
import AuthRoute from "./routes/user.route.js"
import RoleRoute from "./routes/role.route.js"

const app = express()
app.use(express.json())
app.use(cookie());

app.use("/api/auth",AuthRoute);
app.use("/api/role",RoleRoute);

export default app;