import { CodeDto } from "../dto/code-dto";

export interface ClientToServerEvents {
  "run": (code: CodeDto) => void;
  "stdin": (input: string) => void;
  "kill": (sigkill: number | null) => void;
}
