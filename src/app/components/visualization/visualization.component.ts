import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ThreejsService } from 'src/app/services/threejs.service';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss'
})
export class VisualizationComponent {

  @ViewChild('rendererContainer', { static: true }) rendererContainer: ElementRef<HTMLDivElement>;

  constructor(private threeJSService: ThreejsService) {}

  ngAfterViewInit(): void {
    this.threeJSService.init(this.rendererContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.threeJSService.dispose();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.threeJSService.onResize(this.rendererContainer.nativeElement);
  }
}
