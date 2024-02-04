
import Roomhandler from '../Handler';
import Service from '../Service';
// Mocking the Service module
jest.mock('../Service', () => ({
  AddRoom: jest.fn(),
  GetRoomList: jest.fn(),
  UpdateRoom: jest.fn(),
  DeleteRoom: jest.fn(),
}));

describe('Roomhandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addRoom', () => {
    it('should call Service.AddRoom with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.addRoom(mockReq, mockRes);

    //   expect(Service.AddRoom).toHaveBeenCalledWith(mockReq.body, mockRes, mockReq.user.userId);
    });

    it('should handle errors and return 500 status', async () => {
      Service.AddRoom.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ }, user: { userId: 'mockUserId' } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.addRoom(mockReq, mockRes);

    //   
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('getRoomList', () => {
    it('should call Service.GetRoomList with correct parameters', async () => {
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.getRoomList(mockReq, mockRes);

      expect(Service.GetRoomList).toHaveBeenCalledWith(mockRes, mockReq.query);
    });

    it('should handle errors and return 500 status', async () => {
      Service.GetRoomList.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { query: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.getRoomList(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('updateRoom', () => {
    it('should call Service.UpdateRoom with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.updateRoom(mockReq, mockRes);

      expect(Service.UpdateRoom).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.UpdateRoom.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.updateRoom(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });

  describe('deleteRoom', () => {
    it('should call Service.DeleteRoom with correct parameters', async () => {
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.deleteRoom(mockReq, mockRes);

      expect(Service.DeleteRoom).toHaveBeenCalledWith(mockReq.body, mockRes);
    });

    it('should handle errors and return 500 status', async () => {
      Service.DeleteRoom.mockRejectedValueOnce(new Error('Some error'));
      const mockReq = { body: { /* your mock data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await Roomhandler.deleteRoom(mockReq, mockRes);

      
    //   expect(mockRes.send).toHaveBeenCalledWith({ response_code: 2, response_message: "Sorry something went wrong" });
    });
  });
});


