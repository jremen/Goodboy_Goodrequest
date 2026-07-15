export class ApiError extends Error {
  constructor(
    public readonly status: number,
    body?: string,
  ) {
    super(`API responded with ${status}: ${body}`);
    this.name = "ApiError";
  }
}
