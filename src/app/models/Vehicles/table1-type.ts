import { DetailsType } from './details-type';

export interface Table1Type {
  vehicleId: string;
  licensePlate: string;
  make: string;
  model: string;
  type: string;
  vin: string;
  status: string;
  locationCity: string;
  locationGps: string;
  details: DetailsType;
}
