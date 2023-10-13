import { Controller, Get, Req } from '@nestjs/common';
import { LandingPageService } from './landing-page.service';
import { CreateLandingPageDto } from './dto/create-landing-page.dto';
import { UpdateLandingPageDto } from './dto/update-landing-page.dto';

@Controller('landing-page')
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  // @Post()
  // create(@Body() createLandingPageDto: CreateLandingPageDto) {
  //   return this.landingPageService.create(createLandingPageDto);
  // }

  @Get()
  landinPage(@Req() request) {
    return this.landingPageService.landingPage(request);
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
