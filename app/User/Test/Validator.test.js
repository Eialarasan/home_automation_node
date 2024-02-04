import { Validation, LoginValidation } from '../Validator'; // Replace with the actual module path
import { isValidUsername, isValidateUserMaxLength, isValidPhoneNumber, isValidEmail, isValidPassword, isValidPasswordMaxLength } from '../Validator'; // Replace with the actual module path and functions

jest.mock('../Validator');

describe('Validation middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass validation for user registration', () => {
    const req = {
      body: {
        user_name: 'JohnDoe',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        password: 'securePassword',
      },
    };
    const res = { send: jest.fn() };
    const next = jest.fn();

    // Mocking the validation functions to return true
    // isValidUsername.mockReturnValueOnce(true);
    // isValidateUserMaxLength.mockReturnValueOnce(true);
    // isValidPhoneNumber.mockReturnValueOnce(true);
    // isValidEmail.mockReturnValueOnce(true);
    // isValidPassword.mockReturnValueOnce(true);
    // isValidPasswordMaxLength.mockReturnValueOnce(true);

    Validation(req, res, next);

    // Verifying that the next function is called
  });

  it('should fail validation for user registration and send a response', () => {
    const req = {
      body: {
        // ... provide invalid data here ...
      },
    };
    const res = { send: jest.fn() };
    const next = jest.fn();

    // Mocking the validation functions to return false
    // isValidUsername.mockReturnValueOnce(false);
    // isValidateUserMaxLength.mockReturnValueOnce(false);
    // isValidPhoneNumber.mockReturnValueOnce(false);
    // isValidEmail.mockReturnValueOnce(false);
    // isValidPassword.mockReturnValueOnce(false);
    // isValidPasswordMaxLength.mockReturnValueOnce(false);

    Validation(req, res, next);

    // Verifying that res.send is called with the expected response
    // expect(res.send).toHaveBeenCalledWith({
    //   response_code: 2,
    //   response_message: '... specify the expected error message ...',
    // });

    // Verifying that next is not called
    // expect(next).not.toHaveBeenCalled();
  });

  // Add similar test cases for LoginValidation
});
