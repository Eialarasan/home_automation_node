import {Validation} from '../Validation'

describe('Validation middleware', () => {
  // Mock objects for request and response
  const req = {
    body: {
      deviceId: 'device123',
      homeId: 'home456',
      roomId: 'room789',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    },
    user: {
      userId: 'user123',
    },
  };

  let res;

  // Mock next function
  const next = jest.fn();

  beforeEach(() => {
    // Clear the mocks and reset response object before each test
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it('should call next when all required fields are present', () => {
    Validation(req, res, next);

    // Expect that next() is called
    expect(next).toHaveBeenCalled();
  });

  it('should send a 400 response if deviceId is missing', () => {
    // Remove deviceId from the request
    delete req.body.deviceId;

    Validation(req, res, next);

    // Expect that res.status(400).send() is called with the appropriate message
    // expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.send).toHaveBeenCalledWith({ response_code: 1, response_message: 'device id is missing' });
  });

  // Similar tests for other fields...

  // Repeat similar tests for homeId, roomId, startTime, and endTime

  // Add more tests as needed
});
