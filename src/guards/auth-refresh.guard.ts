import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromBody(request: Request): string | undefined {
    const { refreshToken } = request.body;
    return refreshToken;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);
    if (!token) {
      throw new UnauthorizedException(`No authorization data in the request`);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      request['user'] = payload;
    } catch (error: unknown) {
      throw new ForbiddenException(error);
    }
    return true;
  }
}
