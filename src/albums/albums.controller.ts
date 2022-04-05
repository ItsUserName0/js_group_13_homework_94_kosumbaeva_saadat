import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      title: albumData.title,
      artist: albumData.artist,
      release: albumData.release ? albumData.release : null,
      is_published: albumData.is_published,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    return album.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.albumModel.deleteOne({ _id: id });
    return { message: `Deleted album with id: ${id}` };
  }
}
