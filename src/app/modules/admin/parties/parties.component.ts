import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass } from '@angular/common';
import { PartyService } from '../../../core/services/party.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Party } from '../../../core/interfaces/party';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from '../../../core/services/toastr.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [NgClass, NgxSpinnerModule, CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatButtonModule, BreadcrumbComponent, RouterModule, RouterLink],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent implements OnInit {
  displayedColumns: string[] = ['name',
    'company_name',
    'mobile_no',
    'email',
    'date_of_birth',
    'anniversary_date',
    'is_active',
    'actions'];

  parties: Party[] = [];

  constructor(
    private _partyService: PartyService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getPartyList();
  }

  // Fetch the list of parties
  getPartyList() {
    this._spinnerService.show();

    this._partyService.getParties().subscribe({
      next: (response: Party[]) => {
        this.parties = response;
        console.log("parties list ", this.parties);
        this._spinnerService.hide();
      },
      error: (error) => {
        console.error('Error fetching parties:', error);
        this._spinnerService.hide();
      },
    });
  }

  // Delete party by id
  deleteParty(id: number) {
    this._spinnerService.show();
    this._partyService.deletePartyById(id).subscribe({
      next: (response) => {
        this._spinnerService.hide();
        this._toastrService.success(response?.msg ?? "Party deleted successfully!");
        this.getPartyList();
      },
      error: (error) => {
        console.error("Error deleting party:", error);
        this._spinnerService.hide();
      }
    });
  }
}
