import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-construction-results',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './construction-results.component.html',
  styleUrl: './construction-results.component.scss'
})
export class ConstructionResultsComponent {

  displayedColumns: string[] = ['column1', 'column2'];
  
  dataSource = [
    { column1: 'Max. load', column2: '' },
    { column1: 'Percentage', column2: '' },
    { column1: 'Optimal', column2: '' },
    { column1: 'Value', column2: '' }
  ];

}
