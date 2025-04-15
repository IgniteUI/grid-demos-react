import VEHICLES_DATA from '../assets/data/vehicles.json';
import DRIVERS_DATA from '../assets/data/drivers.json';
import TRIP_HISTORY_DATA from '../assets/data/trip_history.json';
import MAINTENANCE_DATA from '../assets/data/maintenance.json';
import COST_DATA from '../assets/data/cost.json';
import UTILIZATION_DATA from '../assets/data/utilization.json';

class DataService {
  private vehiclesData = VEHICLES_DATA;
  private driversData = DRIVERS_DATA;
  private tripHistoryData = TRIP_HISTORY_DATA;
  private maintenanceData = MAINTENANCE_DATA;
  private costData = COST_DATA;
  private utilizationData = UTILIZATION_DATA;

  private fuelCostsCache: { [key: string]: any[] } = {};

  constructor() {
    /* this.utilizationData.forEach(vehicle => {
      (vehicle.utilization as any).__dataIntents = {
        "'2023'": ["SeriesTitle/2023"],
        "'2024'": ["SeriesTitle/2024"]
      };
    }); */
  }

  getVehiclesData() {
    return this.vehiclesData;
  }

  getDriverData(driverName: string) {
    return this.driversData.find(data => data.name === driverName);
  }

  getDriverPhoto(driverName: string) {
    return this.getDriverData(driverName)?.photo;
  }

  getTripHistoryData(vehicleId: string) {
    const temp = this.tripHistoryData.find(data => data.vehicleId === vehicleId)?.tripHistory;
    //console.log(temp)
    return temp;
  }

  getMaintenanceData(vehicleId: string) {
    const temp = this.maintenanceData.find(data => data.vehicleId === vehicleId)?.maintenance;
    return temp;
  }

  getCostsPerTypeData(vehicleId: string, period: string) {
    const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
    if (!dataItem || !(period in dataItem.costPerType)) return [];
    return dataItem.costPerType[period as keyof typeof dataItem.costPerType];
  }

  getCostsPerMeterData(vehicleId: string, period: string) {
    const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
    if (!dataItem || !(period in dataItem.costsPerMeterPerQuarter)) return [];
    return dataItem.costsPerMeterPerQuarter[period as keyof typeof dataItem.costsPerMeterPerQuarter];
  }

  getFuelCostsData(vehicleId: string, period: string) {
    const cacheKey = vehicleId + period;

    if (this.fuelCostsCache[cacheKey]) {
      return this.fuelCostsCache[cacheKey];
    }

    const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
    const fuelCostsPerMonth = dataItem?.fuelCostsPerMonth || [];

    let fuelCostsPerMonthPeriod: any[];

    switch (period) {
      case 'ytd':
      case '12months':
        fuelCostsPerMonthPeriod = fuelCostsPerMonth;
        break;
      case '6months':
        fuelCostsPerMonthPeriod = fuelCostsPerMonth.splice(-6);
        break;
      case '3months':
        fuelCostsPerMonthPeriod = fuelCostsPerMonth.splice(-3);
        break;
      default:
        console.warn("Invalid period:", period);
        return [];
    }

    this.fuelCostsCache[cacheKey] = fuelCostsPerMonthPeriod;
    return fuelCostsPerMonthPeriod;
  }

  getUtilizationData(vehicleId: string) {
    const temp = this.utilizationData.find(data => data.vehicleId === vehicleId)?.utilization ?? [];
    return temp;
  }
}

export const dataService = new DataService();
