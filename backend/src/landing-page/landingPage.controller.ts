import { Controller, Post, Get, Req, Param, Body } from '@nestjs/common';
import { LandingPageService } from './landingPage.service';
import { OutputLandinPageDto } from './dto/output.dto';
import { LandingPageDto } from './dto/input.dto';

@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  // @Post()
  // create(@Body() createLandingPageDto: CreateLandingPageDto) {
  //   return this.landingPageService.create(createLandingPageDto);
  // }

  @Post()
  async landinPage(@Body() dto: LandingPageDto): Promise<OutputLandinPageDto> {
    return await this.landingPageService.landingPage(dto);
  }

  @Get()
  async test(@Req() request): Promise<string> {
    console.log(request.headers.authorization);
    return "Connect to GET TEST Controller";
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
