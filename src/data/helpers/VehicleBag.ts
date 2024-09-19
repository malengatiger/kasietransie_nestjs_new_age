import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';

export class VehicleBag {
  vehicleId: string;
  created: string;
  dispatchRecords: DispatchRecord[];
  heartbeats: VehicleHeartbeat[];
  passengerCounts: AmbassadorPassengerCount[];
  arrivals: VehicleArrival[];
  departures: VehicleDeparture[];
}
