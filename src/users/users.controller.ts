import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post("/signup")
  @ApiTags("signup")
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
