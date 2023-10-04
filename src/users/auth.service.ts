import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async signup(email: string, password: string) {
    const existingEmail = await this.usersService.find(email);
    if (existingEmail.length) {
      throw new HttpException("username is taken", 403);
    }
    // hash the user's password
    // generate a salt
    const salt = randomBytes(8).toString("hex");

    // hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hash result and the salt together
    const result = salt + "." + hash.toString("hex");

    //create a new user and save it
    const user = await this.usersService.create(email, result);

    return user;
  }

  signin() {

  }
}