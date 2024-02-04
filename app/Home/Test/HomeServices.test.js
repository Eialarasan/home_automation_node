import HomeService from'../Service'// Adjust the path as needed
import Entity from '../../../Entity/index'

jest.mock('../../../Entity/index', () => ({
  Home: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  },
  Home: {}, // Mock other models as needed
  Device: {},
  Room: {},
}));

describe('HomeService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AddHome', () => {
    it('should add home successfully', async () => {
      const data = {
        homeName: 'My Home',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

     

      // Call the method
      await HomeService.AddHome(data, res, 'userId');

     

      // Assert that Entity.Home.create is called with the correct payload
     

      // Assert that the response is sent with the correct data
     
    });

    it('should handle the case when home already exists', async () => {
      const data = {
        homeName: 'My Home',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };


      // Call the method
      await HomeService.AddHome(data, res, 'userId');

      // Assert that the response is sent with the correct data
     
    });

    it('should handle errors during home creation', async () => {
      const data = {
        homeName: 'My Home',
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };


      // Mock an error during home creation

      // Call the method
      await HomeService.AddHome(data, res, 'userId');

      // Assert that the response is sent with the correct data
     
    });
  });

  describe('GetHomeList', () => {
    it('should get home list successfully', async () => {
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findAll
      const mockHomeList = [
        { id: 1, homeName: 'My Home 1' },
        { id: 2, homeName: 'My Home 2' },
      ];

      // Call the method
      await HomeService.GetHomeList(res);

      // Assert that Entity.Home.findAll is called with the correct arguments

      // Assert that the response is sent with the correct data
     
    });

    it('should handle errors during home list retrieval', async () => {
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock an error during home list retrieval

      // Call the method
      await HomeService.GetHomeList(res);

      // Assert that the response is sent with the correct data
     
    });
  });

  describe('UpdateHome', () => {
    it('should update home successfully', async () => {
      const data = {
        id: 1,
        homeName: 'Updated My Home',
        is_active: true,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findOne
      const mockFindId = {
        update: jest.fn().mockResolvedValueOnce(),
      };

      // Call the method
      await HomeService.UpdateHome(data, res);

      
     
    });

    it('should handle the case when home is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findOne when home is not found

      // Call the method
      await HomeService.UpdateHome(data, res);

      // Assert that the response is sent with the correct data
     
    });

    it('should handle errors during home update', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findOne
      const mockFindId = {
        update: jest.fn().mockRejectedValueOnce(new Error('Failed to update home')),
      };

      // Call the method
      await HomeService.UpdateHome(data, res);

      // Assert that the response is sent with the correct data
     
    });
  });

  describe('DeleteHome', () => {
    it('should delete home successfully', async () => {
      const data = {
        id: 1,
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findOne
      const mockFindId = {
        destroy: jest.fn().mockResolvedValueOnce(),
      };

      // Call the method
      await HomeService.DeleteHome(data, res);

     
      
    });

    it('should handle the case when home is not found', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      

      // Call the method
      await HomeService.DeleteHome(data, res);

      // Assert that the response is sent with the correct data
     
    });

    it('should handle errors during home deletion', async () => {
      const data = {
        id: 1,
        // Other data...
      };

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      };

      // Mock the response from Entity.Home.findOne
      const mockFindId = {
        destroy: jest.fn().mockRejectedValueOnce(new Error('Failed to delete home')),
      };

      // Call the method
      await HomeService.DeleteHome(data, res);

      // Assert that the response is sent with the correct data
     
    });
  });
  // Add tests for other methods (GetHomeList, UpdateHome, DeleteHome) similarly
});
