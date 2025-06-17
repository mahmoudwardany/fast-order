import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RestaurantRequestService } from './restaurant-requests.service';
import { CreateRestaurantRequestDto } from './dto/create-restaurant.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminCommentDto } from './dto/admin-comment.dto';

@Controller('restaurant-request')
export class RestaurantRequestController {
  constructor(private readonly service: RestaurantRequestService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateRestaurantRequestDto, @CurrentUser() user) {
    return this.service.create(dto, user);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id/approve')
  async approve(@Param('id', ParseIntPipe) id: number) {
    await this.service.approve(id);
    return {
      statusCode: 200,
      message: 'Request approved successfully',
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id/reject')
  async reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: AdminCommentDto,
  ) {
    await this.service.reject(id, payload);
    return {
      statusCode: 200,
      message: 'Request rejected successfully',
    };
  }

  @Get('pending')
  @UseGuards(AuthGuard, AdminGuard)
  getAllPending() {
    return this.service.findPendingRequests();
  }
}
