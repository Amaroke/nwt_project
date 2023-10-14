import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;

@Schema({
    toJSON: {
        virtuals: true
    },
    versionKey: false
})
export class Question {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
    })
    content: string;

    @Prop({
        type: Number,
        required: true,
    })
    type: number;

    @Prop({
        type: Number, //TODO: SWAP FOR mongoose.Schema.Types.ObjectId later
        required: true,
    })
    owner: number;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    date: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

