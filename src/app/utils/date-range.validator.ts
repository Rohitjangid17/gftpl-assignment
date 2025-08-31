import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dobBeforeAnniversaryValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const dob = control.get('date_of_birth')?.value;
    const anniversary = control.get('anniversary_date')?.value;

    if (dob && anniversary && new Date(dob) >= new Date(anniversary)) {
      return { dobAfterAnniversary: true };
    }
    return null;
  };
}
