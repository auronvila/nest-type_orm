import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { UserDto } from "../users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler

    return next.handle().pipe(
      map((data: any) => {
          // run something before it goes back as a response.
          return plainToClass(UserDto, data, { excludeExtraneousValues: true });
        }
      )
    );
  }
}