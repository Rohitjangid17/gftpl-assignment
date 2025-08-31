import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PartyService } from '../../../../core/services/party.service';
import { Party } from '../../../../core/interfaces/party';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-party',
  imports: [
    BreadcrumbComponent, ReactiveFormsModule, MatInputModule, NgIf, MatFormFieldModule, MatButtonModule,
    MatSelectModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.scss'
})
export class CreatePartyComponent {
  partyForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _partyService: PartyService
  ) {
    this.partyForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      telephone_no: ['', [Validators.required]],
      whatsapp_no: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      anniversary_date: ['', [Validators.required]],
      gst_type: ['', [Validators.required]],
      gstin: ['', [Validators.required]],
      pan_no: ['', [Validators.required]],
      apply_tds: [false],
      credit_limit: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bank_id: ['', [Validators.required]],
      opening_balance: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      membership: ['', [Validators.required]],
      opening_balance_type: ['', [Validators.required]],
    });
  }

  // create the new party
  createNewParty() {
    // const party: Party = {
    //   id: 0,
    //   name: '',
    //   description: '',
    //   date: new Date()
    // };
  }
}
