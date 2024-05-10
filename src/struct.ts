import type { SetReturnType } from 'type-fest';
import type { ValidationIssue, Validator } from './types';
import { toIssues } from './utils/toIssues';
import { runValidation } from './utils/runValidation';
import { StructError } from './error';

interface StructParams<T, S> {
  schema: S;
  type: string;
  validator: Validator;
}

export class Struct<T = unknown, S = unknown> {
  readonly schema: S;
  readonly type: string;
  readonly validator: SetReturnType<Validator, Iterable<ValidationIssue>>;

  constructor({ type, schema, validator }: StructParams<T, S>) {
    this.type = type;
    this.schema = schema;

    this.validator = (value, context) =>
      toIssues(this, validator(value, context), value, context);
  }
}

export function validate<T, S>(
  struct: Struct<T, S>,
  value: unknown,
): [StructError, null] | [null, T] {
  const generator = runValidation(struct, value);
  const result = generator.next();

  if (result.done) {
    if (!result.value) throw new Error('Validation failed with no issues');
    return [null, result.value.value as T];
  }

  return [new StructError(result.value, generator), null];
}
