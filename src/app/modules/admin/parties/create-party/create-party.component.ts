import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PartyService } from '../../../../core/services/party.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getAddresses, getBanks } from '../../../../utils/form-utils';
import { ToastrService } from '../../../../core/services/toastr.service';
import { dobBeforeAnniversaryValidator } from '../../../../utils/date-range.validator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

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
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    RouterLink,
    RouterModule,
    NgxSpinnerModule
  ],
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent implements OnInit {
  partyForm: FormGroup;
  partyId: number | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _partyService: PartyService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _activateRoute: ActivatedRoute,
    private _spinnerService: NgxSpinnerService
  ) {
    this.partyForm = this._formBuilder.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      telephone_no: ['', [Validators.pattern(/^[0-9]{6,12}$/)]],
      whatsapp_no: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      remark: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      anniversary_date: ['', Validators.required],
      gst_type: ['', Validators.required],
      gstin: ['', [Validators.pattern(/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9-A-Z]{1})$/)]],
      pan_no: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      apply_tds: [false],
      login_access: [false],
      credit_limit: ['', [Validators.min(0)]],
      opening_balance: ['', [Validators.min(0)]],
      opening_balance_type: ['', Validators.required],
      membership: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      supplier_type: [''],
      payment_terms: [''],
      addresses: this._formBuilder.array([this.createAddress()]),
      banks: this._formBuilder.array([this.createBank()])
    }, { validators: dobBeforeAnniversaryValidator });
  }

  ngOnInit() {
    this._activateRoute.params.subscribe(params => {
      this.partyId = params['id'] ? +params['id'] : null;
      if (this.partyId) {
        this.getPartyById(this.partyId);
      }
    });
  }

  // get party by id
  getPartyById(id: number) {
    this._spinnerService.show();
    this._partyService.getPartyById(id).subscribe({
      next: (response) => {
        console.log("get by id res ", response);
        this.partyForm.patchValue({
          name: response.name,
          company_name: response.company_name,
          mobile_no: response.mobile_no,
          telephone_no: response.telephone_no,
          whatsapp_no: response.whatsapp_no,
          remark: response.remark,
          date_of_birth: response.date_of_birth ? new Date(response.date_of_birth) : '',
          anniversary_date: response.anniversary_date ? new Date(response.anniversary_date) : '',
          gst_type: response.gst_type,
          gstin: response.gstin,
          pan_no: response.pan_no,
          apply_tds: response.apply_tds,
          login_access: response.login_access,
          credit_limit: response.credit_limit,
          opening_balance: response.opening_balance,
          opening_balance_type: response.opening_balance_type,
          membership: response.membership,
          email: response.email,
          supplier_type: response.supplier_type ? response.supplier_type : '',
          payment_terms: response.payment_terms ? response.payment_terms : ''
        });

        // Patch addresses safely
        getAddresses(this.partyForm).clear();
        (response.address || []).forEach((address: any) =>
          getAddresses(this.partyForm).push(this._formBuilder.group({
            address_line_1: [address.address_line_1 || '', Validators.required],
            address_line_2: [address.address_line_2 || ''],
            country: ['', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]],
            state: ['', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]],
            city: ['', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]],
            pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
            address_type: [address.address_type]
          }))
        );

        // Patch banks safely
        getBanks(this.partyForm).clear();
        (response.bank_id || []).forEach((bank: any) =>
          getBanks(this.partyForm).push(this._formBuilder.group({
            bank_name: [bank.bank_name || '', Validators.required],
            account_no: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(18)]],
            branch_name: [bank.branch_name || ''],
            account_holder_name: [bank.account_holder_name || ''],
            bank_ifsc_code: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
          }))
        );

        this._spinnerService.hide();
      }
    });
  }

  // Create Address FormGroup
  createAddress(): FormGroup {
    return this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: [''],
      country: [''],
      pincode: ['', [Validators.required, Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      address_type: ['']
    });
  }

  // Add Address
  addAddress() {
    (this.partyForm.get('addresses') as FormArray).push(this.createAddress());
  }

  // Remove Address
  removeAddress(index: number) {
    if (getAddresses(this.partyForm).controls.length > 1) {
      getAddresses(this.partyForm).removeAt(index);
    }
  }

  // Create Bank FormGroup
  createBank(): FormGroup {
    return this._formBuilder.group({
      bank_name: ['', Validators.required],
      account_no: ['', [Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
      branch_name: [''],
      account_holder_name: [''],
      bank_ifsc_code: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]]
    });
  }

  // Add Bank
  addBank() {
    (this.partyForm.get('banks') as FormArray).push(this.createBank());
  }

  // Remove Bank
  removeBank(index: number) {
    if (getBanks(this.partyForm).controls.length > 1) {
      getBanks(this.partyForm).removeAt(index);
    }
  }

  // Submit Form
  saveParty() {
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

    if (this.partyId) {
      // Update existing party
      this._partyService.updatePartyById(this.partyId, payload).subscribe({
        next: (response: any) => {
          this._spinnerService.hide();
          this._toastrService.success(response?.msg ?? "Party updated successfully!");
          this._router.navigate(['/parties']);
        },
        error: (err) => {
          this._spinnerService.hide();
          console.error('Error updating party:', err);
          this._toastrService.error('Failed to update party. Please try again.');
        }
      });
    } else {
      // Create new party
      this._partyService.createParty(payload).subscribe({
        next: (response: any) => {
          this._spinnerService.hide();
          this._toastrService.success(response?.msg ?? "Party created successfully!");
          this._router.navigate(['/parties']);
        },
        error: (err) => {
          this._spinnerService.hide();
          console.error('Error creating party:', err);
          this._toastrService.error('Failed to create party. Please try again.');
        }
      });
    }
  }

  // Getter for addresses FormArray
  get addresses(): FormArray {
    return getAddresses(this.partyForm);
  }

  // Getter for banks FormArray
  get banks(): FormArray {
    return getBanks(this.partyForm);
  }
}
