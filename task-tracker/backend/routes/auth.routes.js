    import express from "express";
    import { googleLogin, login, signup } from "../controllers/auth.controller.js";

    const router = express.Router();

    router.post("/signup", signup);
    router.post("/login", login);
    router.post('/google',googleLogin);

    export default router;
