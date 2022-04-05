import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistData: CreateArtistDto,
  ) {
    const artist = new this.artistModel({
      title: artistData.title,
      description: artistData.description ? artistData.description : null,
      is_published: artistData.is_published,
      image: file ? '/uploads/artists/' + file.filename : null,
    });

    return artist.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.artistModel.deleteOne({ _id: id });
    return { message: `Deleted artist with id: ${id}` };
  }
}
