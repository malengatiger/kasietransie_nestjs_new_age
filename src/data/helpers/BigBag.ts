import { AmbassadorPassengerCount } from '../models/AmbassadorPassengerCount';
import { DispatchRecord } from '../models/DispatchRecord';
import { VehicleArrival } from '../models/VehicleArrival';
import { VehicleDeparture } from '../models/VehicleDeparture';
import { VehicleHeartbeat } from '../models/VehicleHeartbeat';

export class BigBag {
  passengerCounts: AmbassadorPassengerCount[];
  vehicleHeartbeats: VehicleHeartbeat[];
  vehicleArrivals: VehicleArrival[];
  vehicleDepartures: VehicleDeparture[];
  dispatchRecords: DispatchRecord[];
  created: string;
}
