'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ContactSchema } from '@/lib/schema';
import type { 
  ContactInput, 
  Status, 
  UIField, 
  ZodIssueTree, 
  FieldErrors, 
  UseContactFormOptions 
} from '@/lib/types';
import { toTree, toFieldErrors } from '@/lib/utils';

export function useContactForm(opts: UseContactFormOptions = {}) {
  const endpoint = opts.endpoint ?? '/api/contact';

  const [values, setValues] = useState<ContactInput>({
    name: '',
    email: '',
    message: '',
    website: '',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [errorsByField, setErrorsByField] = useState<FieldErrors>({});

  const setValue = useCallback(
    <K extends keyof ContactInput>(key: K, v: ContactInput[K]) => {
      setValues(prev => ({ ...prev, [key]: v }));
    },
    []
  );

  const bind = useCallback(
    <K extends keyof ContactInput>(key: K) => {
      return {
        name: key,
        value: values[key] ?? '',
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setValue(key, e.currentTarget.value as ContactInput[K]),
      };
    },
    [values, setValue]
  );

  const firstError = useCallback(
    (field: UIField): string | undefined => {
      const arr = errorsByField[field];
      return arr && arr.length > 0 ? String(arr[0]) : undefined;
    },
    [errorsByField]
  );

  const validateClient = useCallback(() => {
    const parsed = ContactSchema.safeParse(values);
    if (parsed.success) {
      setErrorsByField({});
      return { ok: true as const, data: parsed.data };
    }
    const tree = toTree(parsed.error);
    setErrorsByField(toFieldErrors(tree));
    return { ok: false as const, error: 'Invalid input' };
  }, [values]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus('submitting');
      setError('');

      const v = validateClient();
      if (!v.ok) {
        setStatus('error');
        setError(v.error);
        opts.onError?.(v.error);
        return;
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(v.data),
        });

        const dataUnknown: unknown = await res.json().catch(() => ({}));
        type ApiOk = { ok: true; id?: string };
        type ApiErr = { ok: false; error?: string; issues?: ZodIssueTree };
        const data = dataUnknown as ApiOk | ApiErr | Record<string, unknown>;

        if (!res.ok || (typeof data === 'object' && data !== null && 'ok' in data && data.ok === false)) {
          if (typeof data === 'object' && data !== null && 'issues' in data && data.issues) {
            setErrorsByField(toFieldErrors(data.issues as ZodIssueTree));
          }
          const msg = typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string'
            ? data.error
            : 'Failed to send';
          setStatus('error');
          setError(msg);
          opts.onError?.(msg);
          return;
        }

        setErrorsByField({});
        setStatus('success');
        opts.onSuccess?.();
      } catch {
        const msg = 'Network or server error';
        setStatus('error');
        setError(msg);
        opts.onError?.(msg);
      }
    },
    [endpoint, opts, validateClient]
  );

  return useMemo(
    () => ({
      values,
      setValue,
      bind,
      status,
      error,
      errorsByField,
      firstError,
      handleSubmit,
    }),
    [values, setValue, bind, status, error, errorsByField, firstError, handleSubmit]
  );
}
