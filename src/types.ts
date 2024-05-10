export interface ValidationContext {
  path: unknown[];
  branch: unknown[];
}

export interface ValidationIssue extends ValidationContext {
  message: string;
  expected: string;
  received: string;
}

export type ValidationResult = string | boolean | Partial<ValidationIssue>;

export type Validator = (
  value: unknown,
  context: ValidationContext,
) => ValidationResult | Iterable<ValidationResult>;
