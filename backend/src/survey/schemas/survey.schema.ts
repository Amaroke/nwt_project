import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SurveyDocument = Survey & Document;

@Schema({
    toJSON: {
        virtuals: true
    },
    versionKey: false
})
export class Survey {
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
    description: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    date: Date;

    @Prop({
        type: String,
        required: true,
    })
    owner: string;

    @Prop({
        type: [String],
        required: true,
    })
    questions: string[];

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    downloads: number;
}

export const SurveySchema = SchemaFactory.createForClass(Survey); 