import express from "express";
import patientService from "../services/patients";
import { checkEntryData, checkPatientData } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getAllPatients());
});

router.post("/", (req, res) => {
    try {
        const parsedPatientData = checkPatientData(req.body);
        const result = patientService.addPatient(parsedPatientData);    
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong :(';
        if (error instanceof Error) {
          errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const patient = patientService.getPatientData(id);
        res.send(patient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong :(';
        if (error instanceof Error) {
          errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
      const id = req.params.id;
      const parsedEntryData = checkEntryData(req.body);
      const result = patientService.addEntry(id, parsedEntryData);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.statusCode = 400;
        res.send(error.message);
      } else {
        console.error(`Unknown error: ${error}`);
      }
    }
  });
  
export default router;