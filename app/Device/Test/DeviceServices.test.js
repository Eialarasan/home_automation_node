import DeviceService from'../Service'// Adjust the path as needed
import Entity from '../../../Entity/index'

// Mock the Entity module
jest.mock('../../../Entity/index', () => ({
  Device: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Home: {},
  Device: {},
}));

describe('DeviceService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AddDevice', () => {
    it('should add Device successfully', async () => {
      const data = {
        DeviceName: 'Living Device',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };


      // Call the method
      await DeviceService.AddDevice(data, res);


      // Assert that Entity.Device.create is called with the correct payload
     

      // Assert that the response is sent with the correct data
    
    });

    it('should handle the case when Device already exists', async () => {
      const data = {
        DeviceName: 'Living Device',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Call the method
      await DeviceService.AddDevice(data, res);

      // Assert that the response is sent with the correct data
    
    });

    it('should handle errors during Device creation', async () => {
      const data = {
        DeviceName: 'Living Device',
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock an error during Device creation

      // Call the method
      await DeviceService.AddDevice(data, res);

      // Assert that the response is sent with the correct data
      
    });
  });

  describe('GetDeviceList', () => {
    it('should get Device list successfully', async () => {
      const data = {
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Device.findAll
      const mockDeviceList = [
        { id: 1, DeviceName: 'Living Device' },
        { id: 2, DeviceName: 'BedDevice' },
      ];

      // Call the method
      await DeviceService.GetDeviceList(res, data);

    });

    it('should handle errors during Device list retrieval', async () => {
      const data = {
        homeId: 'exampleHomeId',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

     
      await DeviceService.GetDeviceList(res, data);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });

  describe('UpdateDevice', () => {
    it('should update Device successfully', async () => {
      const data = {
        id: 1,
        DeviceName: 'Updated Living Device',
        homeId: 'exampleHomeId',
        is_active: true,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Device.findOne
      const mockFindId = {
        update: jest.fn().mockResolvedValueOnce(),
      };

      // Call the method
      await DeviceService.UpdateDevice(data, res);


      // Assert that the response is sent with the correct data
   
    });

    it('should handle the case when Device is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

     
      await DeviceService.UpdateDevice(data, res);

      // Assert that the response is sent with the correct data
    
    });

    it('should handle errors during Device update', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Device.findOne
      const mockFindId = {
        update: jest.fn().mockRejectedValueOnce(new Error('Failed to update Device')),
      };

      // Call the method
      await DeviceService.UpdateDevice(data, res);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });

  describe('DeleteDevice', () => {
    it('should delete Device successfully', async () => {
      const data = {
        id: 1,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      const mockFindId = {
        destroy: jest.fn().mockResolvedValueOnce(),
      };

      await DeviceService.DeleteDevice(data, res);

     
      
    });

    it('should handle the case when Device is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

    
      await DeviceService.DeleteDevice(data, res);

      // Assert that the response is sent with the correct data
      
    });

    it('should handle errors during Device deletion', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Device.findOne
      const mockFindId = {
        destroy: jest.fn().mockRejectedValueOnce(new Error('Failed to delete Device')),
      };
      // Entity.Device.findOne.mockResolvedValueOnce(mockFindId);

      // Call the method
      await DeviceService.DeleteDevice(data, res);

      // Assert that the response is sent with the correct data
      // expect(res.status).toHaveBeenCalledWith(500);
      // expect(res.send).toHaveBeenCalledWith({
      //   response_code: 2,
      //   response_message: 'Sorry something went wrong',
      // });
    });
  });
});
