import Service from'../Service'// Adjust the path as needed
import Entity from '../../../Entity/index'
jest.mock('../../../Entity/index', () => ({
  Schedule: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  },
  Home: {}, // Mock other models as needed
  Device: {},
  Room: {},
}));

//Handler


describe('Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AddSchedule', () => {
    it('should add schedule successfully', async () => {
      const data = {
        deviceId: 'deviceId',
        homeId: 'homeId',
        roomId: 'roomId',
        startTime: 'startTime',
        endTime: 'endTime',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      Entity.Schedule.findOne.mockResolvedValue(null);
      Entity.Schedule.create.mockResolvedValueOnce();

      await Service.AddSchedule(data, res);

      expect(Entity.Schedule.findOne).toHaveBeenCalledWith({
        where: { deviceId: 'deviceId' },
      });
      expect(Entity.Schedule.create).toHaveBeenCalledWith({
        deviceId: 'deviceId',
        homeId: 'homeId',
        roomId: 'roomId',
        startTime: 'startTime',
        endTime: 'endTime',
        createdDate: expect.any(Date),
      });
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Schedule added successfully',
        response_code: 0,
      });
    });

    // Add more tests for other scenarios (e.g., when schedule already exists)
  });

  describe('GetScheduleList', () => {
    it('should get schedule list successfully', async () => {
      const data = {
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Schedule.findAll
      const mockScheduleList = [
        { id: 1, startTime: '10:00 AM', endTime: '12:00 PM' },
        { id: 2, startTime: '2:00 PM', endTime: '4:00 PM' },
      ];
      Entity.Schedule.findAll.mockResolvedValueOnce(mockScheduleList);

      // Call the method
      await Service.GetScheduleList(res, data);

      // Assert that Entity.Schedule.findAll is called with the correct arguments
      expect(Entity.Schedule.findAll).toHaveBeenCalledWith({
        where: { homeId: 'exampleHomeId' },
        include: [
          { model: Entity.Home },
          { model: Entity.Device },
          { model: Entity.Room },
        ],
      });

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'success',
        response: mockScheduleList,
        response_code: 0,
      });
    });

    // Add more test cases for different scenarios (e.g., when homeId is not provided)
  });

  describe('UpdateSchedule', () => {
    it('should update schedule successfully', async () => {
      const data = {
        id: 1,
        deviceId: 'exampleDeviceId',
        homeId: 'exampleHomeId',
        roomId: 'exampleRoomId',
        startTime: '9:00 AM',
        endTime: '11:00 AM',
        is_active: true,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Schedule.findOne
      const mockFindId = {
        update: jest.fn().mockResolvedValueOnce(),
      };
      Entity.Schedule.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await Service.UpdateSchedule(data, res);

      // Assert that Entity.Schedule.findOne is called with the correct arguments
      expect(Entity.Schedule.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      // Assert that findId.update is called with the correct payload
      expect(mockFindId.update).toHaveBeenCalledWith({
        deviceId: 'exampleDeviceId',
        roomId: 'exampleRoomId',
        homeId: 'exampleHomeId',
        startTime: '9:00 AM',
        endTime: '11:00 AM',
        isActive: true,
      });

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Schedule updated successfully',
        response_code: 0,
      });
    });

    it('should handle the case when schedule is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Schedule.findOne when schedule is not found
      Entity.Schedule.findOne.mockResolvedValueOnce(null);

      // Call the method
      await Service.UpdateSchedule(data, res);

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Schedule not found',
        response_code: 1,
      });
    });

    

    // Add more test cases for different scenarios (e.g., error during update)
  });
  
  describe('DeleteSchedule', () => {
  
    it('should delete schedule successfully', async () => {
      const data = {
        id: 1,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Schedule.findOne
      const mockFindId = {
        destroy: jest.fn().mockResolvedValueOnce(),
      };
      Entity.Schedule.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await Service.DeleteSchedule(data, res);

      // Assert that Entity.Schedule.findOne is called with the correct arguments
      expect(Entity.Schedule.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      // Assert that findId.destroy is called
      expect(mockFindId.destroy).toHaveBeenCalled();

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Schedule deleted successfully',
        response_code: 0,
      });
    });

    it('should handle the case when schedule is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Schedule.findOne when schedule is not found
      Entity.Schedule.findOne.mockResolvedValueOnce(null);

      // Call the method
      await Service.DeleteSchedule(data, res);

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Schedule not found',
        response_code: 1,
      });
    });
})
  // Add tests for other methods (GetScheduleList, UpdateSchedule, DeleteSchedule) similarly
});
