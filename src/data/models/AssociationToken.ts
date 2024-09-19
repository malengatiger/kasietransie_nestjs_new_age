import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'AssociationToken',
})
export class AssociationToken {
  _partitionKey: string;

  _id: string;
  @Prop()
  userId: string;
  @Prop()
  token: string;
  @Prop()
  created: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
}

export const AssociationTokenSchema =
  SchemaFactory.createForClass(AssociationToken);
