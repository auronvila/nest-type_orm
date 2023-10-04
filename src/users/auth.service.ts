import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async signup(email: string, password: string) {
    const existingEmail = await this.usersService.find(email);
    if (existingEmail.length) {
      throw new HttpException('username is taken', 403);
    }
    // hash the users password

  }

  signin() {

  }
}