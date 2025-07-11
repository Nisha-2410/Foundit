import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchRoutes from "./routes/search.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/search", searchRoutes);


app.get("/", (req, res) => {
  res.send("FoundIt backend is live 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

