import { z } from 'zod';
import type { FieldErrors, ZodIssueTree } from '@/lib/types';

export function toFieldErrors(tree: ZodIssueTree): FieldErrors {
  const pick = (node?: ZodIssueTree) =>
    node && Array.isArray(node._errors) && node._errors.length ? node._errors : undefined;
  return {
    name: pick(tree.name as ZodIssueTree | undefined),
    email: pick(tree.email as ZodIssueTree | undefined),
    message: pick(tree.message as ZodIssueTree | undefined),
  };
}

export function toTree(err: z.ZodError<unknown>): ZodIssueTree {
  const zAny = z as unknown as { treeifyError?: (e: z.ZodError<unknown>) => unknown };
  if (typeof zAny.treeifyError === 'function') {
    return zAny.treeifyError(err) as ZodIssueTree;
  }
  return (err as unknown as { format: () => unknown }).format() as ZodIssueTree;
}
