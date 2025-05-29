export interface APIResponse<T = unknown, E = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: E;
}
