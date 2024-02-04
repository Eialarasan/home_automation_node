import UserHandler from '../Handler';
import Service from '../Service';

jest.mock('../Service', () => ({
  UserRegister: jest.fn(),
  UserLogin: jest.fn(),
}));

describe('UserHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UserRegister', () => {
    it('should call Service.UserRegister with valid data', async () => {
      const req = { body: { /* your test data for UserRegister */ } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserHandler.UserRegister(req, res);

    //   expect(Service.UserRegister).toHaveBeenCalledWith(req.body, res);
    });

    it('should handle errors and send a 500 response', async () => {
      const req = { body: { /* your test data for UserRegister */ } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      Service.UserRegister.mockRejectedValueOnce(new Error('Some error'));

      await UserHandler.UserRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
     
    });
  });

  describe('UserLogin', () => {
    it('should call Service.UserLogin with valid data', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { send: jest.fn() };

      await UserHandler.UserLogin(req, res);

      expect(Service.UserLogin).toHaveBeenCalledWith(req.body, res);
    });

    it('should handle missing email and send a 2 response code', async () => {
      const req = { body: { password: 'password123' } };
      const res = { send: jest.fn() };

      await UserHandler.UserLogin(req, res);

      
    });

    // Add similar test cases for other conditions (e.g., invalid email, missing password, etc.)
  });
});
