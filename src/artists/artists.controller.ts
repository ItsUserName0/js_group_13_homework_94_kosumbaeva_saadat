import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { CreateArtistDto } from './create-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistModel.findOne({ _id: id });
  }

  @Post()
  create(@Body() artistDto: CreateArtistDto) {
    const artist = new this.artistModel({
      title: artistDto.title,
      image: artistDto.image ? artistDto.image : null,
      description: artistDto.description ? artistDto.description : null,
      is_published: artistDto.is_published ? artistDto.is_published : false,
    });

    return artist.save();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.artistModel.deleteOne({ _id: id });
  }
}
