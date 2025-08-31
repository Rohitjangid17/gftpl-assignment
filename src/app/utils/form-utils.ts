import { FormArray, FormGroup } from '@angular/forms';

export const getAddresses = (form: FormGroup): FormArray => {
  return form.get('addresses') as FormArray;
}

export const getBanks = (form: FormGroup): FormArray => {
  return form.get('banks') as FormArray;
}
