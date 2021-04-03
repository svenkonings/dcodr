import {WorkerStatus} from "./WorkerStatus";
import {CoderOutput} from "./CoderResult";

export type WorkerOutput = CoderOutput | Error | WorkerStatus;
