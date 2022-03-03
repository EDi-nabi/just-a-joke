import { SubmitPayload } from "./submit-payload.interface";

export interface SubmitResponse {
  error: boolean;
  message: string;
  submission: SubmitPayload;
  timestamp: number;
}
