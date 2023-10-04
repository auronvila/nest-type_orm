import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Run something before a request is handled by the request handler
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findById(userId);
      request.currentUser = user;
    }
    return next.handle();
  }
}