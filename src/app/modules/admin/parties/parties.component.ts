import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PartyService } from '../../../core/services/party.service';

@Component({
  selector: 'app-parties',
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'date', 'actions'];

  parties = [
    { name: 'Birthday Bash', location: 'New York', date: new Date('2025-09-01') },
    { name: 'Wedding Ceremony', location: 'Los Angeles', date: new Date('2025-09-10') },
    { name: 'Corporate Meetup', location: 'Chicago', date: new Date('2025-09-20') }
  ];

  constructor(
    private _partyService: PartyService
  ) { }

  ngOnInit(): void {
    // Fetch parties data on component initialization
    this._partyService.getParties().subscribe((data: any) => {
      console.log(data);
    });
  }
}
