import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

// for joke type 'single', 'joke' field is required and min 20 characters long
// for joke type 'twopart' 'setup' and 'delivery' fields are required amd min 20 characters long
export const jokeTypeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const type = control.get('type');
  const joke = control.get('joke');
  const setup = control.get('setup');
  const delivery = control.get('delivery');

  if (type?.value === 'single') {
    if (!joke?.value) {
      return { jokeRequired: true };
    } else if (joke.value.length < 20) {
      return { jokeToShort: true };
    }
  } else if (type?.value === 'twopart') {
    if (!setup?.value || !delivery?.value) {
      return { twoPartsRequired: true };
    } else if ((setup.value + delivery.value).length < 20) {
      return { twoPartsToShort: true };
    }
  }
  return null;
};
