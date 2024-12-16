import data from "../../data/diagnoses";
import { Diagnose } from "../types";

const diagnosesData : Diagnose[] = data;
const getDiagnosis = (): Diagnose[] => {
    return diagnosesData;
};

export default getDiagnosis;