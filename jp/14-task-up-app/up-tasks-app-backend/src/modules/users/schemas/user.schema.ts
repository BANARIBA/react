import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isConfirmed: boolean;
  isActive: boolean;
}

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  })
  public email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    trim: true,
  })
  public password: string;

  @Prop({
    type: String,
    required: [true, 'Complete Name is required'],
    trim: true,
  })
  public name: string;

  @Prop({ type: Boolean, required: [true, 'Email is required'], default: false })
  public isConfirmed: boolean;

  @Prop({ type: Boolean, required: [true, 'Email is required'], default: true })
  public isActive: boolean;
}

export const UserSchemaFactory = SchemaFactory.createForClass<IUser>(User);
