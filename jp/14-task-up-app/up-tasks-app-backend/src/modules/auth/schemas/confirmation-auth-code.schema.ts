import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IConfirmationAuthCode extends Document {
  code: string;
  user: Types.ObjectId;
  createdAt: Date;
}

@Schema({
  versionKey: false,
  timestamps: false,
})
export class ConfirmationAuthCode extends Document {
  @Prop({ type: String, required: [true, 'Token Code is required'] })
  public code: string;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
  })
  public user: Types.ObjectId;

  @Prop({
    type: Date,
    default: new Date(),
    expires: '1h',
  })
  public createdAt: Date;
}

export const ConfirmationAuthCodeFactory =
  SchemaFactory.createForClass<IConfirmationAuthCode>(ConfirmationAuthCode);
