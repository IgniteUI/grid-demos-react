import { CostRecord, FuelCostsPerMonth } from "../models/cost.model.ts";
import { Driver } from "../models/driver.model.ts";
import { MaintenanceHistory } from "../models/maintenance-history.model.ts";
import { TripHistory } from "../models/trip-history.model.ts";
import { UtilizationRecord } from "../models/utilization.model.ts";
import { Vehicle } from "../models/vehicle.model.ts";

const VEHICLE_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/vehicles.json';
const DRIVERS_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/drivers.json';
const COST_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/cost.json';
const MAINTENANCE_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/maintenance.json';
const UTILIZATION_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/utilization.json';
const TRIP_HISTORY_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/trip_history.json';

class DataService {
  private vehiclesRecords: Vehicle[] = [];
  private driverRecords: Driver[] = [];
  private tripHistoryRecords: TripHistory[] = [];
  private maintenanceRecords: MaintenanceHistory[] = [];
  private costRecords: CostRecord[] = [];
  private utilizationRecords: UtilizationRecord[] = [];

  private fuelCostsCache: { [key: string]: FuelCostsPerMonth[] } = {};

  async getVehiclesData() {
    const response = await fetch(VEHICLE_DATA_URL);
      this.vehiclesRecords = await response.json();
  }

  async getDriverData() {
    const response = await fetch(DRIVERS_DATA_URL);
    this.driverRecords = await response.json();
  }

  async getTripHistoryData() {
    const response = await fetch(TRIP_HISTORY_DATA_URL);
    this.tripHistoryRecords = await response.json();
  }

  async getMaintenanceData() {
    const response = await fetch(MAINTENANCE_DATA_URL);
    this.maintenanceRecords = await response.json();
  }

  async getCostData() {
    const response = await fetch(COST_DATA_URL);
    this.costRecords = await response.json();
  }

  async getUtilizationData() {
    const response = await fetch(UTILIZATION_DATA_URL);
    const data = await response.json();

    data.forEach((vehicle: UtilizationRecord) => {
      (vehicle.utilization as any).__dataIntents = {
        "'2023'": ['SeriesTitle/2023'],
        "'2024'": ['SeriesTitle/2024']
      };
    });

    this.utilizationRecords = data;
  }

  async loadOptionalData() {
    await Promise.all([
      this.getDriverData(),
      this.getTripHistoryData(),
      this.getMaintenanceData(),
      this.getCostData(),
      this.getUtilizationData()
    ]);
  }

  findDriverByName(driverName: string) {
    return this.driverRecords.find((d: Driver) => d.name === driverName)
  }

  getDriverPhoto(driverName: string) {
    return this.findDriverByName(driverName)?.photo;
  }

  findTripHistoryById(vehicleId: string) {
    return this.tripHistoryRecords.find((d: TripHistory) => d.vehicleId === vehicleId)?.tripHistory;
  }

  findMaintenanceDataById(vehicleId: string) {
    return this.maintenanceRecords.find((d: MaintenanceHistory) => d.vehicleId === vehicleId)?.maintenance;
  }

  findCostsPerTypeData(vehicleId: string, period: string) {
    const item = this.costRecords.find((d: CostRecord) => d.vehicleId === vehicleId);
    return item?.costPerType?.[period] || [];
  }

  findCostsPerMeterData(vehicleId: string, period: string) {
    const item = this.costRecords.find((d: CostRecord) => d.vehicleId === vehicleId);
    return item?.costsPerMeterPerQuarter?.[period] || [];
  }

  getFuelCostsData(vehicleId: string, period: string) {
    const cacheKey = vehicleId + period;
    if (this.fuelCostsCache[cacheKey]) {
      return this.fuelCostsCache[cacheKey];
    }

    const item = this.costRecords.find((d: CostRecord) => d.vehicleId === vehicleId);
    const fuelCosts = item?.fuelCostsPerMonth || [];

    let result: FuelCostsPerMonth[] = [];
    switch (period) {
      case 'ytd':
      case '12months':
        result = fuelCosts;
        break;
      case '6months':
        result = fuelCosts.slice(-6);
        break;
      case '3months':
        result = fuelCosts.slice(-3);
        break;
      default:
        console.warn('Invalid period:', period);
        return [];
    }

    this.fuelCostsCache[cacheKey] = result;
    return result;
  }

  public findUtilizationDataById(vehicleId: string) {
    const item = this.utilizationRecords.find((d: UtilizationRecord) => d.vehicleId === vehicleId);
    return item ? item.utilization : [];
  }

  public get vehicleList() {
    return this.vehiclesRecords;
  }
  public get driverList() {
    return this.driverRecords;
  }
}

export const dataService = new DataService();
