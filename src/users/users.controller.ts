import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";


@ApiTags("auth")
@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post("/signup")
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  findUser(@Param("id") id: string) {
    return this.usersService.findById(parseInt(id));
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
