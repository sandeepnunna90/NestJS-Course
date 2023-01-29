import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

/* Validating using JWT token

Whenever we want users to be procted , only to signed in users, we will be able to
import the auth module and then use the gaurd. These routes will be then protected.
And when an authorized request sends in a request, we will be able to get not just
the claims, but the actual user object and treat it as a source of truth.

We can just import this module to other modules for jwt validation and need not
repeat this code again.
*/
