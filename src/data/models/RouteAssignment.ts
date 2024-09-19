import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'RouteAssignment',
})
export class RouteAssignment {
  _partitionKey: string;
  _id: string;
  
  @Prop()
  associationId: string;
  @Prop()
  routeId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  active: number;
  @Prop()
  created: string;
  @Prop()
  routeName: string;
  @Prop()
  associationName: string;
  @Prop()
  vehicleReg: string;
}

export const RouteAssignmentSchema =
  SchemaFactory.createForClass(RouteAssignment);
