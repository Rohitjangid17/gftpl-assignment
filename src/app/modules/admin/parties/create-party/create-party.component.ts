import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-party',
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
    NgClass,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent implements OnInit {
  partyForm: FormGroup;
  partyId: number | null = null;
  isLoader: boolean = false;
  isSaving: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _partyService: PartyService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _activateRoute: ActivatedRoute,
  ) {
    this.partyForm = this._formBuilder.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      telephone_no: [''],
      whatsapp_no: [''],
      remark: [''],
      date_of_birth: [''],
      anniversary_date: [''],
      gst_type: [''],
      gstin: [''],
      pan_no: [''],
      apply_tds: [false],
      login_access: [false],
      credit_limit: ['', [Validators.min(0)]],
      opening_balance: ['', [Validators.min(0)]],
      opening_balance_type: ['', Validators.required],
      membership: ['',],
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
    this.isLoader = true;
    this._partyService.getPartyById(id).subscribe({
      next: (response) => {
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
            address_line_2: [address.address_line_2 || '', Validators.required],
            country: [''],
            state: [''],
            city: [''],
            pincode: [''],
            address_type: [address.address_type]
          }))
        );

        // Patch banks safely
        getBanks(this.partyForm).clear();
        (response.bank_id || []).forEach((bank: any) =>
          getBanks(this.partyForm).push(this._formBuilder.group({
            bank_name: [bank.bank_name || ''],
            account_no: [''],
            branch_name: [bank.branch_name || ''],
            account_holder_name: [bank.account_holder_name || ''],
            bank_ifsc_code: [''],
          }))
        );

        this.isLoader = false;
      },
      error: (err) => {
        this.isLoader = false;
        console.error('Error fetching party:', err);
        this._toastrService.error('Failed to fetch party details. Please try again.');
      }
    });
  }

  // Create Address FormGroup
  createAddress(): FormGroup {
    return this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      city: ['',],
      state: [''],
      country: [''],
      pincode: [''],
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
      bank_name: [''],
      account_no: [''],
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
    if (getBanks(this.partyForm).controls.length > 1) {
      getBanks(this.partyForm).removeAt(index);
    }
  }

  // Submit Form
  saveParty() {
    this.isSaving = true;

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
          this.isSaving = false;
          if (response.success) {
            this._toastrService.success(response?.msg ?? "Party updated successfully!");
            this._router.navigate(['/parties']);
          } else {
            this._toastrService.error(response?.msg ?? "Failed to update party.");
          }
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error updating party:', err);
          this._toastrService.error('Failed to update party. Please try again.');
        }
      });
    } else {
      // Create new party
      this._partyService.createParty(payload).subscribe({
        next: (response: any) => {
          this.isSaving = false;
          this._toastrService.success(response?.msg ?? "Party created successfully!");
          this._router.navigate(['/parties']);
        },
        error: (err) => {
          this.isSaving = false;
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
