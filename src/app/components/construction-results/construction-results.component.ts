import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ConstructionCalcService } from 'src/app/services/construction-calc.service';

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

  constructor(private calcService: ConstructionCalcService) {}

  ngOnInit() {
    // Subscribe to calculation results
    this.calcService.calculationResults$.subscribe((results) => {
      if (results) {
        this.updateTable(results);
      }
    });
  }

  updateTable(results: any) {
    this.dataSource = [
      { column1: 'Max. load', column2: results.maxLoad },
      { column1: 'Percentage', column2: results.percentage },
      { column1: 'Optimal', column2: results.optimal },
      { column1: 'Value', column2: results.value },
    ];
  }
  
}
