import type { Struct } from '../struct';
import type { ValidationContext } from '../types';

export function* runValidation<T, S>(struct: Struct<T, S>, value: unknown) {
  let isValid = true;
  const context: ValidationContext = { path: [], branch: [] };

  for (const issue of struct.validator(value, context)) {
    isValid = false;
    yield issue;
  }

  if (isValid) return [value as T] as const;
}
