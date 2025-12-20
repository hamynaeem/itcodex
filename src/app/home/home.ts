import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only run this on browser
      const carouselEl = document.querySelector('#servicesCarousel');
      if (carouselEl && (window as any).bootstrap) {
        new (window as any).bootstrap.Carousel(carouselEl, {
          interval: 3000,
          ride: 'carousel',
        });
      }
    }
  }
}