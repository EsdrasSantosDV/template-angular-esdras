import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export type itemForm = ReturnType<typeof createItemForm>;

export function createItemForm(
  params: {
    titleItem: string;
    description: string | null;
    startDate: Date | null;
    finalDate: Date | null;
  } = {
    titleItem: '',
    description: null,
    startDate: null,
    finalDate: null,
  },
  fb = inject(FormBuilder)
) {
  return fb.group({
    titleItem: fb.control<string>(params.titleItem, [Validators.required]),
    description: fb.control<string | null>(params.description),
    startDate: fb.control<Date | null>(params.startDate),
    finalDate: fb.control<Date | null>(params.finalDate),
  });
}
