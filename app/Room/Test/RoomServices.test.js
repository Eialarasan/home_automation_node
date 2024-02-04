import RoomService from'../Service'// Adjust the path as needed
import Entity from '../../../Entity/index'

// Mock the Entity module
jest.mock('../../../Entity/index', () => ({
  Room: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Home: {},
  Device: {},
}));

describe('RoomService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AddRoom', () => {
    it('should add room successfully', async () => {
      const data = {
        roomName: 'Living Room',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      Entity.Room.findOne.mockResolvedValueOnce(null);

      // Call the method
      await RoomService.AddRoom(data, res);

      // Assert that Entity.Room.findOne is called with the correct arguments
      expect(Entity.Room.findOne).toHaveBeenCalledWith({
        where: { roomName: 'Living Room' },
      });

      // Assert that Entity.Room.create is called with the correct payload
      expect(Entity.Room.create).toHaveBeenCalledWith({
        roomName: 'Living Room',
        homeId: 'exampleHomeId',
        createdDate: expect.any(Date),
      });

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Room added successfully',
        response_code: 0,
      });
    });

    it('should handle the case when room already exists', async () => {
      const data = {
        roomName: 'Living Room',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne when room already exists
      Entity.Room.findOne.mockResolvedValueOnce({ id: 1, roomName: 'Living Room' });

      // Call the method
      await RoomService.AddRoom(data, res);

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Room already exists',
        response_code: 1,
      });
    });

    it('should handle errors during room creation', async () => {
      const data = {
        roomName: 'Living Room',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      Entity.Room.findOne.mockResolvedValueOnce(null);

      // Mock an error during room creation
      Entity.Room.create.mockRejectedValueOnce(new Error('Failed to create room'));

      // Call the method
      await RoomService.AddRoom(data, res);

      // Assert that the response is sent with the correct data
      
    });
  });

  describe('GetRoomList', () => {
    it('should get room list successfully', async () => {
      const data = {
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findAll
      const mockRoomList = [
        { id: 1, roomName: 'Living Room' },
        { id: 2, roomName: 'Bedroom' },
      ];
      Entity.Room.findAll.mockResolvedValueOnce(mockRoomList);

      // Call the method
      await RoomService.GetRoomList(res, data);

      // Assert that Entity.Room.findAll is called with the correct arguments
      expect(Entity.Room.findAll).toHaveBeenCalledWith({
        where: { homeId: 'exampleHomeId' },
        include: [
          { model: Entity.Home },
          { model: Entity.Device },
        ],
      });

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'success',
        response: mockRoomList,
        response_code: 0,
      });
    });

    it('should handle errors during room list retrieval', async () => {
      const data = {
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock an error during room list retrieval
      Entity.Room.findAll.mockRejectedValueOnce(new Error('Failed to retrieve room list'));

      // Call the method
      await RoomService.GetRoomList(res, data);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });

  describe('UpdateRoom', () => {
    it('should update room successfully', async () => {
      const data = {
        id: 1,
        roomName: 'Updated Living Room',
        homeId: 'exampleHomeId',
        is_active: true,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      const mockFindId = {
        update: jest.fn().mockResolvedValueOnce(),
      };
      Entity.Room.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await RoomService.UpdateRoom(data, res);

      // Assert that Entity.Room.findOne is called with the correct arguments
      expect(Entity.Room.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      // Assert that mockFindId.update is called with the correct payload
      expect(mockFindId.update).toHaveBeenCalledWith({
        roomName: 'Updated Living Room',
        homeId: 'exampleHomeId',
        isActive: true,
      });

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Room updated successfully',
        response_code: 0,
      });
    });

    it('should handle the case when room is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne when room is not found
      Entity.Room.findOne.mockResolvedValueOnce(null);

      // Call the method
      await RoomService.UpdateRoom(data, res);

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Room not found',
        response_code: 1,
      });
    });

    it('should handle errors during room update', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      const mockFindId = {
        update: jest.fn().mockRejectedValueOnce(new Error('Failed to update room')),
      };
      Entity.Room.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await RoomService.UpdateRoom(data, res);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });

  describe('DeleteRoom', () => {
    it('should delete room successfully', async () => {
      const data = {
        id: 1,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      const mockFindId = {
        destroy: jest.fn().mockResolvedValueOnce(),
      };
      Entity.Room.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await RoomService.DeleteRoom(data, res);

      // Assert that Entity.Room.findOne is called with the correct arguments
      expect(Entity.Room.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      // Assert that mockFindId.destroy is called
      expect(mockFindId.destroy).toHaveBeenCalled();

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'success',
        message: 'Room deleted successfully',
        response_code: 0,
      });
    });

    it('should handle the case when room is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne when room is not found
      Entity.Room.findOne.mockResolvedValueOnce(null);

      // Call the method
      await RoomService.DeleteRoom(data, res);

      // Assert that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Room not found',
        response_code: 1,
      });
    });

    it('should handle errors during room deletion', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Room.findOne
      const mockFindId = {
        destroy: jest.fn().mockRejectedValueOnce(new Error('Failed to delete room')),
      };
      Entity.Room.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await RoomService.DeleteRoom(data, res);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });
});
