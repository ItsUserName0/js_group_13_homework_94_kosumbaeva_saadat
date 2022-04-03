import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Album' })
  album: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  duration: string;

  @Prop({ default: false })
  is_published: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
