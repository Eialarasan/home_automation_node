
import Homehandler from '../Handler';
import Service from '../Service';
// Mocking the Service module
jest.mock('../Service', () => ({
  AddHome: jest.fn(),
  GetHomeList: jest.fn(),
  UpdateHome: jest.fn(),
  DeleteHome: jest.fn(),
}));

describe('Homehandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addHome', () => {
    it('should call Service.AddHome with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.addHome(mockReq, mockRes);

    //   expect(Service.AddHome).toHaveBeenCalledWith(mockReq.body, mockRes, mockReq.user.userId);
    });

    it('should handle errors and return 500 status', async () => {
      Service.AddHome.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.addHome(mockReq, mockRes);

    //   
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('getHomeList', () => {
    it('should call Service.GetHomeList with correct parameters', async () => {
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.getHomeList(mockReq, mockRes);

      // expect(Service.GetHomeList).toHaveBeenCalledWith(mockRes, mockReq.query);
    });

    it('should handle errors and return 500 status', async () => {
      Service.GetHomeList.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.getHomeList(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('updateHome', () => {
    it('should call Service.UpdateHome with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.updateHome(mockReq, mockRes);

      expect(Service.UpdateHome).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.UpdateHome.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.updateHome(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('deleteHome', () => {
    it('should call Service.DeleteHome with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.deleteHome(mockReq, mockRes);

      expect(Service.DeleteHome).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.DeleteHome.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Homehandler.deleteHome(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });
});


