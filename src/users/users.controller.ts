import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../intercenptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";


@Serialize(UserDto)
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

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    console.log("handler is running.");
    return await this.usersService.findById(parseInt(id));
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }
}
