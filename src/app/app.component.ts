import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Route {
  source: string;
  destination: string;
  via: string;
}

@Component({
  selector: 'app-root',
  // imports:[RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes: Route[] = [
    { source: 'New Delhi', destination: 'Mumbai', via: 'Jaipur' },
    { source: 'New Delhi', destination: 'Mumbai', via: 'Udaipur' },
    { source: 'New Delhi', destination: 'Mumbai', via: 'Ahmedabad' },
    { source: 'Bengaluru', destination: 'Chennai', via: 'Hosur' },
    { source: 'Bengaluru', destination: 'Chennai', via: 'Krishnagiri' },
    { source: 'Bengaluru', destination: 'Chennai', via: 'Vellore' },
    { source: 'Kolkata', destination: 'Hyderabad', via: 'Bhubaneswar' },
    { source: 'Kolkata', destination: 'Hyderabad', via: 'Visakhapatnam' },
    { source: 'Pune', destination: 'Goa', via: 'Kolhapur' }
  ];
  keyword = '';
  filteredRoutes: Route[] = [];
  onKeyup(): void {
    const key = this.keyword.trim().toLowerCase();

    if (!key) {
      this.filteredRoutes = [];
      return;
    }

    this.filteredRoutes = this.routes.filter(route =>
      route.source.toLowerCase().startsWith(key) ||
      route.destination.toLowerCase().startsWith(key) ||
      route.via.toLowerCase().startsWith(key)
    );
  }


}
