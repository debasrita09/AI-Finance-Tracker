import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = 5000;

console.log("PK:", process.env.CLERK_PUBLISHABLE_KEY);
console.log("SK exists:", !!process.env.CLERK_SECRET_KEY);

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});