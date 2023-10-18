import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  })
  export class User{

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      })
      _id: any;
    
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
      })
      firstname: string;
    
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
      })
      lastname: string;
    
    
    @Prop({
        type: String,
        required: true,
        trim: true,
      })
      email: string;
    
    
    
    @Prop({
        type: String,
        required: true,
        minlength: 5,
      })
      password: string;
    
    
    
    @Prop({
        type: String,
        required: true,
        match: /^(\+\d{11})$/,
      })
      phone: string;
    
  }

  export const UserSchema = SchemaFactory.createForClass(User);