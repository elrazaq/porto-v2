import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './auth.dto.js';
import { validate } from 'class-validator';

describe('AuthController', () => {
  const auth = {
    register: vi.fn(),
    login: vi.fn(),
    refresh: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
  } as unknown as AuthService;
  const controller = new AuthController(auth);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets httpOnly cookies and never returns token values on login', async () => {
    const user = { id: 'user-1', email: 'person@example.com', name: null, roles: ['user'] };
    vi.mocked(auth.login).mockResolvedValue({
      user,
      accessToken: 'access-secret-value',
      refreshToken: 'refresh-secret-value',
    });
    const response = { cookie: vi.fn() } as never;

    await expect(controller.login({ email: user.email, password: 'long-test-password' }, response))
      .resolves.toEqual({ user });
    expect(response.cookie).toHaveBeenCalledTimes(2);
    expect(response.cookie).toHaveBeenCalledWith(
      'access_token',
      'access-secret-value',
      expect.objectContaining({ httpOnly: true, maxAge: 15 * 60 * 1000 }),
    );
  });

  it('rotates refresh cookies without returning token values', async () => {
    const user = { id: 'user-1', email: 'person@example.com', name: null, roles: ['user'] };
    vi.mocked(auth.refresh).mockResolvedValue({
      user,
      accessToken: 'new-access-secret-value',
      refreshToken: 'new-refresh-secret-value',
    });
    const response = { cookie: vi.fn(), clearCookie: vi.fn() } as never;
    const request = { cookies: { refresh_token: 'old-refresh-token' } } as never;

    await expect(controller.refresh(request, response)).resolves.toEqual({ ok: true });
    expect(auth.refresh).toHaveBeenCalledWith('old-refresh-token');
    expect(response.cookie).toHaveBeenCalledTimes(2);
  });

  it('revokes the refresh cookie on logout', async () => {
    vi.mocked(auth.logout).mockResolvedValue(undefined);
    const response = { clearCookie: vi.fn() } as never;
    const request = { cookies: { refresh_token: 'refresh-token' } } as never;

    await expect(controller.logout(request, response)).resolves.toEqual({ ok: true });
    expect(auth.logout).toHaveBeenCalledWith('refresh-token');
    expect(response.clearCookie).toHaveBeenCalledTimes(2);
  });

  it('rejects a public registration payload that includes a role', async () => {
    const payload = Object.assign(new RegisterDto(), {
      email: 'person@example.com',
      password: 'strong-test-password',
      role: 'admin',
    });

    const errors = await validate(payload, { whitelist: true, forbidNonWhitelisted: true });
    expect(errors[0]?.constraints).toHaveProperty('whitelistValidation');
  });
});
