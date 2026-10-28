import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './auth.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import type { AuthenticatedRequest } from './jwt-auth.guard.js';

const ACCESS_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';
const ACCESS_MAX_AGE = 15 * 60 * 1000;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post('register')
	register(@Body() body: RegisterDto) {
		return this.auth.register(body.email, body.password, body.name);
	}

	@Post('login')
	async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
		const result = await this.auth.login(body.email, body.password);
		this.setCookies(response, result.accessToken, result.refreshToken);
		return { user: result.user };
	}

	@Post('refresh')
	async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
		try {
			const result = await this.auth.refresh(request.cookies?.[REFRESH_COOKIE] ?? '');
			this.setCookies(response, result.accessToken, result.refreshToken);
			return { ok: true };
		} catch (error) {
			this.clearCookies(response);
			if (error instanceof UnauthorizedException) throw error;
			throw error;
		}
	}

	@Post('logout')
	async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
		await this.auth.logout(request.cookies?.[REFRESH_COOKIE]);
		this.clearCookies(response);
		return { ok: true };
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	me(@Req() request: AuthenticatedRequest) {
		return this.auth.getProfile(request.user.userId);
	}

	private setCookies(response: Response, accessToken: string, refreshToken: string): void {
		const isProd = process.env.NODE_ENV === 'production';
		const sameSite = (process.env.COOKIE_SAME_SITE as 'lax' | 'none' | 'strict') || (isProd ? 'none' : 'lax');
		const secure = isProd || sameSite === 'none';

		response.cookie(ACCESS_COOKIE, accessToken, {
			httpOnly: true,
			secure,
			sameSite,
			path: '/',
			maxAge: ACCESS_MAX_AGE,
		});
		response.cookie(REFRESH_COOKIE, refreshToken, {
			httpOnly: true,
			secure,
			sameSite,
			path: '/',
			maxAge: REFRESH_MAX_AGE,
		});
	}

	private clearCookies(response: Response): void {
		const isProd = process.env.NODE_ENV === 'production';
		const sameSite = (process.env.COOKIE_SAME_SITE as 'lax' | 'none' | 'strict') || (isProd ? 'none' : 'lax');
		const secure = isProd || sameSite === 'none';
		const options = {
			httpOnly: true,
			secure,
			sameSite,
			path: '/',
		};
		response.clearCookie(ACCESS_COOKIE, options);
		response.clearCookie(REFRESH_COOKIE, options);
	}
}
