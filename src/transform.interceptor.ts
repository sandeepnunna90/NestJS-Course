// Adding the Interceptor at Application Level
import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}

/*
Paylod Before Interceptor:
{
    "title": "Play",
    "description": "Play Video games",
    "status": "OPEN",
    "user": {
        "id": "0d8fadce-576a-4105-a072-0b4613932c46",
        "username": "User1",
        "password": "$2b$10$kKis06wPkVBWh46NOJUdpeUgB06mVI5q/DZjXoqxFxX8AnilNWEC.",
        "tasks": []
    },
    "id": "68de5c75-bf91-4146-bb5f-1227e85def79"
}

Payload After Interceptor:
{
    "title": "Clean",
    "description": "Clean My Room",
    "status": "OPEN",
    "id": "8b7b8bd0-f4de-4241-a648-c17c188b9ace"
}
*/
