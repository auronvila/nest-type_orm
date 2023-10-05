import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Session, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../intercenptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "../guards/auth.guard";


@Serialize(UserDto)
@ApiTags("auth")
@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService,
              private authService: AuthService) {
  }

  // @Get("/colors/:color")
  // setColor(@Param("color") color: string, @Session() session: any) {
  //   session.color = color;
  // }
  //
  // @Get("colors")
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  @Get("/whoAmI")
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/signup")
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
  @ApiBody({ type: CreateUserDto })
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
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
