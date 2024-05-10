import type { Struct } from '../struct';
import type {
  ValidationResult,
  ValidationContext,
  ValidationIssue,
} from '../types';
import { getType } from './getType';

export function* toIssues<T, S>(
  struct: Struct<T, S>,
  results: ValidationResult | Iterable<ValidationResult>,
  value: unknown,
  context: ValidationContext,
): Generator<ValidationIssue, void> {
  const iterableResults =
    typeof results === 'object' && Symbol.iterator in results ?
      results
    : [results];

  for (const result of iterableResults)
    if (result !== true) {
      let issue: Partial<ValidationIssue> = {};

      if (typeof result === 'object') issue = result;
      else if (typeof result === 'string') issue.message = result;

      const {
        path = context.path,
        branch = context.branch,
        expected = struct.type,
        received = getType(value),
        message = `Expected \`${expected}\`, received \`${received}\``,
      } = issue;

      yield { path, branch, message, expected, received };
    }
}
