export interface ServerToClientEvents {
  "stdout": (output: string) => void;
  "stderr": (output: string) => void;
  "exit": (code: number | null) => void;
  "error": (err: unknown) => void;
}
