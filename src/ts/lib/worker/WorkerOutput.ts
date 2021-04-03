import {WorkerStatus} from "./WorkerStatus";
import {CoderResult} from "./CoderResult";

export type WorkerOutput = CoderResult | Error | WorkerStatus;
