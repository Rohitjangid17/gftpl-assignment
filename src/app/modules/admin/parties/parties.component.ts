import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PartyService } from '../../../core/services/party.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Party } from '../../../core/interfaces/party';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parties',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatButtonModule, BreadcrumbComponent, RouterModule, LoaderComponent, RouterLink],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent implements OnInit {
  displayedColumns: string[] = ['name',
    'company_name',
    'mobile_no',
    'email',
    'gstin',
    'date_of_birth',
    'anniversary_date',
    'is_active',
    'actions'];

  parties: Party[] = [];
  isLoader: boolean = false;

  constructor(
    private _partyService: PartyService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPartyList();
  }

  // Fetch the list of parties
  getPartyList() {
    this.isLoader = true;

    this._partyService.getParties().subscribe({
      next: (response: Party[]) => {
        this.parties = response;
        console.log("parties list ", this.parties);
        this.isLoader = false;
      },
      error: (error) => {
        console.error('Error fetching parties:', error);
        this.isLoader = false;
      },
    });
  }

  updateParty(party: Party) {
    // Logic to update the party
  }

  deleteParty(id: number) {
    this._partyService.deletePartyById(id).subscribe({
      next: (response) => {
        this._toastrService.success(response?.msg ?? "Party deleted successfully!");
        this.getPartyList();
      },
      error: (error) => {
        console.error("Error deleting party:", error);
      }
    });
  }
}
