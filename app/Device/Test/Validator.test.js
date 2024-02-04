// Assuming you have your Express app and the Validation middleware in a file, let's call it validationMiddleware.js
import express from 'express';
import { Validation } from '../Validation';

const app = express();

app.use(express.json()); // Add this line to handle JSON requests

// Your route using the Validation middleware
app.post('/addDevice', Validation, (req, res) => {
  // Your route logic here
  res.status(200).json({ response_code: 0, response_message: "Device added successfully" });
});

// Jest test cases
describe('Validation Middleware', () => {
  it('should pass validation when deviceName, homeId, and roomId are present', () => {
    const req = {
      body: {
        deviceName: 'Smart Device',
        homeId: '1234',
        roomId: '5678',
      },
      user: {
        userId: '6789',
      },
    };
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();

    Validation(req, res, next);

    // Expect next() to have been called, indicating that validation passed
    expect(next).toHaveBeenCalled();
    // Expect send() not to have been called, indicating no errors
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should send an error response when deviceName is missing', () => {
    const req = {
      body: {
        homeId: '1234',
        roomId: '5678',
      },
      user: {
        userId: '6789',
      },
    };
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();

    Validation(req, res, next);

    // Expect next() not to have been called, indicating that validation failed
    expect(next).not.toHaveBeenCalled();
    // Expect send() to have been called with an error response
    expect(res.send).toHaveBeenCalledWith({
      response_code: 2,
      response_message: "Device name is missing",
      response_code: 1,
    });
  });

  // Similar test cases for missing homeId and roomId

  // Add more test cases based on your specific scenarios
});
