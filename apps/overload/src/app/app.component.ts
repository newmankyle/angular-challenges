import { Component } from '@angular/core';
import { createVehicle } from './vehicle.utils';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ``,
})
export class AppComponent {
  car = createVehicle('car', 'diesel');
  moto = createVehicle('moto', 'diesel');
  bus = createVehicle('bus', 'diesel', 20, true);
  boat = createVehicle('boat', 'petrol');
  bicycle = createVehicle('bicycle');
}
