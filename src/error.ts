import type { ValidationIssue } from './types';

export class StructError extends TypeError implements ValidationIssue {
  path: unknown[];
  branch: unknown[];
  expected: string;
  received: string;

  issues!: ValidationIssue[];

  constructor(
    firstIssue: ValidationIssue,
    restIssues: Generator<ValidationIssue>,
  ) {
    super(firstIssue.message);
    this.name = this.constructor.name;

    this.path = firstIssue.path;
    this.branch = firstIssue.branch;
    this.expected = firstIssue.expected;
    this.received = firstIssue.received;

    let cachedIssues: ValidationIssue[] | undefined;

    Object.defineProperty(this.constructor.prototype, 'issues', {
      configurable: true,
      get: () => (cachedIssues ??= [firstIssue, ...restIssues]),
    });
  }
}
