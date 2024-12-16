import express from "express";
import cors from "cors";
import diagnosisRouter from "./src/routes/diagnosis";
import patientRouter from "./src/routes/patients";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/diagnosis', diagnosisRouter);
app.use("/api/patients", patientRouter);


app.get("/api/ping", (_req, _res) => {
    console.log("someone pinged here");
});


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});