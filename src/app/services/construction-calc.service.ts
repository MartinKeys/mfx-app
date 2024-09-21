import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructionCalcService {
  // Observable to hold calculation results
  private calculationResultsSubject = new BehaviorSubject<any>(null);
  calculationResults$ = this.calculationResultsSubject.asObservable();

  constructor() { }

  // Method to perform calculations
  proceedTestCalculation(constructionType: number, profileLength: number, loadType: number, profileType: string) {
    // For demonstration mock some results
    const results = {
      maxLoad: constructionType * 10 + profileLength,
      percentage: loadType * 20,
      optimal: profileType === '28/30' ? 'Yes' : 'No',
      // value: Math.random() * 1000
      value: (Math.random() * 1000).toFixed(2)

    };

    // Emit the results
    this.calculationResultsSubject.next(results);
  }
}
