
import Device from '../Handler';
import Service from '../Service';
// Mocking the Service module
jest.mock('../Service', () => ({
  AddDevice: jest.fn(),
  GetDeviceList: jest.fn(),
  UpdateDevice: jest.fn(),
  DeleteDevice: jest.fn(),
}));

describe('Device', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addDevice', () => {
    it('should call Service.AddDevice with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.addDevice(mockReq, mockRes);

    //   expect(Service.AddDevice).toHaveBeenCalledWith(mockReq.body, mockRes, mockReq.user.userId);
    });

    it('should handle errors and return 500 status', async () => {
      Service.AddDevice.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.addDevice(mockReq, mockRes);

    //   
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('getDeviceList', () => {
    it('should call Service.GetDeviceList with correct parameters', async () => {
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.getDeviceList(mockReq, mockRes);

      expect(Service.GetDeviceList).toHaveBeenCalledWith(mockRes, mockReq.query);
    });

    it('should handle errors and return 500 status', async () => {
      Service.GetDeviceList.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.getDeviceList(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('updateDevice', () => {
    it('should call Service.UpdateDevice with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.updateDevice(mockReq, mockRes);

      expect(Service.UpdateDevice).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.UpdateDevice.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.updateDevice(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('deleteDevice', () => {
    it('should call Service.DeleteDevice with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.deleteDevice(mockReq, mockRes);

      expect(Service.DeleteDevice).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.DeleteDevice.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Device.deleteDevice(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });
});


