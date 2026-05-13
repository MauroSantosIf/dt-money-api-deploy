import { HashPasswordService } from './hash-password.service';

describe('HashPasswordService', () => {
  it('should hash password and not return plain text', async () => {
    const service = new HashPasswordService();

    const result = await service.execute('123456');

    expect(result).not.toBe('123456');
    expect(result).toContain(':');
  });
});
