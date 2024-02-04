import UserService from '../Service';
import Entity from '../../../Entity/index';
import jwt from 'jsonwebtoken';

// Mocking external dependencies
jest.mock('../../../Entity/index');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UserRegister', () => {
    it('should register a new user successfully', async () => {
      const data = {
        user_name: 'JohnDoe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        password: 'securePassword',
        roleId: 1,
      };
      const res = { send: jest.fn() };

      // Mocking the expected behavior of Entity.User.findOne
      Entity.User.findOne.mockResolvedValueOnce(null);

      // Mocking the expected behavior of Entity.User.create
      Entity.User.create.mockResolvedValueOnce(null);

      // Calling the method to be tested
      await UserService.UserRegister(data, res);

      // Verifying the expected interactions
      expect(Entity.User.findOne).toHaveBeenCalledWith({
        where: { email: data.email },
      });

      expect(Entity.User.create).toHaveBeenCalledWith({
        userName: data.user_name,
        phoneNumber: data.phone_number,
        email: data.email,
        password: expect.any(String), // Assuming encryptPass is working
        roleId: data.roleId,
        isActive: 1,
        createdDate: expect.any(Date),
      });

      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'User created successfully',
        response_code: 0,
      });
    });

    it('should handle existing email and send a response', async () => {
      const data = {
        user_name: 'JohnDoe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        password: 'securePassword',
        roleId: 1,
      };
      const res = { send: jest.fn() };

      // Mocking the expected behavior of Entity.User.findOne
      Entity.User.findOne.mockResolvedValueOnce({});

      // Calling the method to be tested
      await UserService.UserRegister(data, res);

      // Verifying the expected interactions
      expect(Entity.User.findOne).toHaveBeenCalledWith({
        where: { email: data.email },
      });

      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'email id is already entered',
        response_code: 1,
      });
    });

    it('should handle errors and send a 500 response', async () => {
      const data = {
        user_name: 'JohnDoe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        password: 'securePassword',
        roleId: 1,
      };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Mocking an error in Entity.User.findOne
      Entity.User.findOne.mockRejectedValueOnce(new Error('Database error'));

      // Calling the method to be tested
      await UserService.UserRegister(data, res);

      // Verifying the expected interactions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        response_code: 2,
        response_message: 'Sorry something went wrong',
      });
    });
  });

  describe('UserLogin', () => {
    it('should log in a user successfully', async () => {
      const data = {
        email: 'john.doe@example.com',
        password: 'securePassword',
      };
      const res = { send: jest.fn() };

      // Mocking the expected behavior of Entity.User.findOne
      Entity.User.findOne.mockResolvedValueOnce({
        email: data.email,
        password: expect.any(String), // Assuming encryptPass is working
        id: 1,
        isActive: 1,
      });

      // Mocking the expected behavior of jwt.sign
      jwt.sign.mockReturnValueOnce('fakeAccessToken');

      // Calling the method to be tested
      await UserService.UserLogin(data, res);

      // Verifying the expected interactions
      expect(Entity.User.findOne).toHaveBeenCalledWith({
        where: { email: data.email, isActive: 1 },
      });

      

     
    });

    it('should handle invalid credentials and send a response', async () => {
      const data = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };
      const res = { send: jest.fn() };

      // Mocking the expected behavior of Entity.User.findOne
      Entity.User.findOne.mockResolvedValueOnce(null);

      // Calling the method to be tested
      await UserService.UserLogin(data, res);

      // Verifying the expected interactions
      expect(Entity.User.findOne).toHaveBeenCalledWith({
        where: { email: data.email, isActive: 1 },
      });

      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        response_message: 'Invalid credentials',
        response_code: 1,
      });
    });

    it('should handle errors and send a 500 response', async () => {
      const data = {
        email: 'john.doe@example.com',
        password: 'securePassword',
      };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Mocking an error in Entity.User.findOne
      Entity.User.findOne.mockRejectedValueOnce(new Error('Database error'));

      // Calling the method to be tested
      await UserService.UserLogin(data, res);

      // Verifying the expected interactions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        response_code: 2,
        response_message: 'Sorry something went wrong',
      });
    });
  });
});
