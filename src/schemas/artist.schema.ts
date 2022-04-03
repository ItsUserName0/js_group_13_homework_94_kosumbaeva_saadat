import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  is_published: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
