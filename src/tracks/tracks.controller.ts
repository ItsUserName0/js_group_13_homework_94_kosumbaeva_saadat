import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query('album') album: string) {
    if (album) {
      return this.trackModel.find({ album });
    }
    return this.trackModel.find();
  }

  @Post()
  create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      title: trackDto.title,
      album: trackDto.album ? trackDto.album : null,
      duration: trackDto.duration,
      is_published: trackDto.is_published,
    });
    return track.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.trackModel.deleteOne({ _id: id });
    return { message: `Deleted track with id: ${id}` };
  }
}
