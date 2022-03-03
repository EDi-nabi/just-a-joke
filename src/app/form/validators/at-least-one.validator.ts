import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

// at least one of the fields should be 'true'
export const atLeastOneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const nsfw = control.get('nsfw')?.value;
  const religious = control.get('religious')?.value;
  const political = control.get('political')?.value;
  const racist = control.get('racist')?.value;
  const sexist = control.get('sexist')?.value;
  const explicit = control.get('explicit')?.value;

  if (nsfw || religious || political || racist || sexist || explicit) {
    return null;
  }
  return { atLeastOneRequired: true };
};
