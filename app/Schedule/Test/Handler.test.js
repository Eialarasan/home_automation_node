
import ScheduleHandler from '../Handler';
import Service from '../Service';
// Mocking the Service module
jest.mock('../Service', () => ({
  AddSchedule: jest.fn(),
  GetScheduleList: jest.fn(),
  UpdateSchedule: jest.fn(),
  DeleteSchedule: jest.fn(),
}));

describe('ScheduleHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addSchedule', () => {
    it('should call Service.AddSchedule with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.addSchedule(mockReq, mockRes);

      expect(Service.AddSchedule).toHaveBeenCalledWith(mockReq.body, mockRes, mockReq.user.userId);
    });

    it('should handle errors and return 500 status', async () => {
      Service.AddSchedule.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.addSchedule(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('getScheduleList', () => {
    it('should call Service.GetScheduleList with correct parameters', async () => {
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.getScheduleList(mockReq, mockRes);

      expect(Service.GetScheduleList).toHaveBeenCalledWith(mockRes, mockReq.query);
    });

    it('should handle errors and return 500 status', async () => {
      Service.GetScheduleList.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.getScheduleList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('updateSchedule', () => {
    it('should call Service.UpdateSchedule with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.updateSchedule(mockReq, mockRes);

      expect(Service.UpdateSchedule).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.UpdateSchedule.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.updateSchedule(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('deleteSchedule', () => {
    it('should call Service.DeleteSchedule with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.deleteSchedule(mockReq, mockRes);

      expect(Service.DeleteSchedule).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.DeleteSchedule.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await ScheduleHandler.deleteSchedule(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });
});


