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
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  getAll(@Query('artist') artist: string) {
    if (artist) {
      return this.albumModel.find({ artist });
    }
    return this.albumModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.findOne({ _id: id });
  }

  @Post()
  create(@Body() albumDto: CreateAlbumDto) {
    const album = new this.albumModel({
      title: albumDto.title,
      artist: albumDto.artist,
      release: albumDto.release ? albumDto.release : null,
      is_published: albumDto.is_published,
    });
    return album.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.albumModel.deleteOne({ _id: id });
    return { message: `Deleted album with id: ${id}` };
  }
}
