export interface MarkerLocation {
  latitude: number;
  longitude: number;
};

export interface VehicleDetails {
  vehiclePhoto: string;
  make: string;
  model: string;
  mileage: string;
  markerLocations: MarkerLocation[];
};