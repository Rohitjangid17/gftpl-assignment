import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PartyService } from '../../../../core/services/party.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ApiResponse } from '../../../../core/interfaces/api-response';

@Component({
  selector: 'app-create-party',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    BreadcrumbComponent,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent {
  partyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private partyService: PartyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: ['', Validators.required],
      whatsapp_no: ['', Validators.required],
      remark: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      gst_type: ['', Validators.required],
      gstin: ['', Validators.required],
      pan_no: ['', Validators.required],
      apply_tds: [false],
      login_access: [false],
      credit_limit: ['', Validators.required],
      opening_balance: ['', Validators.required],
      opening_balance_type: ['Cr', Validators.required],
      membership: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      supplier_type: [''],
      payment_terms: [''],
      addresses: this.fb.array([this.createAddress()]),
      banks: this.fb.array([this.createBank()])
    });
  }

  // Create Address FormGroup
  createAddress(): FormGroup {
    return this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: [''],
      country: [''],
      pincode: ['', Validators.required],
      address_type: ['Billing']
    });
  }

  // Add Address
  addAddress() {
    (this.partyForm.get('addresses') as FormArray).push(this.createAddress());
  }

  // Remove Address
  removeAddress(index: number) {
    if (this.addresses.controls.length > 1) {
      (this.partyForm.get('addresses') as FormArray).removeAt(index);
    }
  }

  // Create Bank FormGroup
  createBank(): FormGroup {
    return this.fb.group({
      bank_name: ['', Validators.required],
      account_no: ['', Validators.required],
      branch_name: [''],
      account_holder_name: [''],
      bank_ifsc_code: ['']
    });
  }

  // Add Bank
  addBank() {
    (this.partyForm.get('banks') as FormArray).push(this.createBank());
  }

  // Remove Bank
  removeBank(index: number) {
    if (this.banks.controls.length > 1) {
      (this.partyForm.get('banks') as FormArray).removeAt(index);
    }
  }

  // Submit Form
  createNewParty() {
    if (this.partyForm.invalid) {
      this.snackBar.open('Please fill all required fields!', 'Close', { duration: 3000 });
      return;
    }

    // Format dates as YYYY-MM-DD
    const dob = this.partyForm.value.date_of_birth
      ? new Date(this.partyForm.value.date_of_birth).toISOString().split('T')[0]
      : null;
    const anniversary = this.partyForm.value.anniversary_date
      ? new Date(this.partyForm.value.anniversary_date).toISOString().split('T')[0]
      : null;

    const payload = {
      ...this.partyForm.value,
      date_of_birth: dob,
      anniversary_date: anniversary,
      address: JSON.stringify(this.partyForm.value.addresses),
      bank_id: JSON.stringify(this.partyForm.value.banks)
    };

    this.partyService.createParty(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this.snackBar.open(response?.msg || 'Party created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/parties']);
      },
      error: (err) => {
        console.error('Error creating party:', err);
        this.snackBar.open('Failed to create party. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  // Helper getters for template
  get addresses() {
    return this.partyForm.get('addresses') as FormArray;
  }

  // Getter for Banks FormArray
  get banks() {
    return this.partyForm.get('banks') as FormArray;
  }
}
