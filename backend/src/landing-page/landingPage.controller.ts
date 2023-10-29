import { Controller, Post, Get, Req, Param, Body, Query } from '@nestjs/common';
import { LandingPageService } from './landingPage.service';
import { OutputLandinPageDto } from './dto/output.dto';
import { Request} from 'express';
@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  @Get()
  async test(@Req() request): Promise<OutputLandinPageDto> {
    console.log("REQUEST User: ", request.user.username);
    return await this.landingPageService.landingPage(request.user.username);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.landingPageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLandingPageDto: UpdateLandingPageDto) {
  //   return this.landingPageService.update(+id, updateLandingPageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.landingPageService.remove(+id);
  // }
}
