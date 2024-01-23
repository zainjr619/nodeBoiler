const UserService = require("../user");

const { userdal } = require("../../dal");
const { postCreateSocialFeed,listSocialFeed } = require('../../tests/data');
const P2PClient = require('../../service/external/p2p-client')
const CustomError = require('../../utils/error');
const { ERROR_CODES } = require('../../constant');

jest.mock("../../service/external/p2p-client")

jest.mock("../../dal", () => ({
  userdal: {
    findOrCreate: jest.fn(),
    findAll:jest.fn(),
    updateById :jest.fn()
  },
}));

describe("service/UserService", () => {
  describe("registerUser()", () => {
    it("should create a user successfully", async () => {
        const req = {
            headers: {
              privateKey: 'validPrivateKey'
            },
            body: {
              user_id: 1,
              country_code: 'Pk', 
              username: 'xyz'
            }
          };

          P2PClient.validatePrivateKey.mockResolvedValueOnce(true);
          userdal.findOrCreate.mockResolvedValueOnce([{ id: 1, fassetId: 1,  countryCode: 'Pk' , userName: 'xyz' }, true]);
      
          const result = await UserService.registerUser(req);
      
          expect(P2PClient.validatePrivateKey).toHaveBeenCalledTimes(1);
          expect(P2PClient.validatePrivateKey).toHaveBeenCalledWith(req.headers, req.body.user_id);
      
          expect(userdal.findOrCreate).toHaveBeenCalledTimes(1);
          expect(userdal.findOrCreate).toHaveBeenCalledWith({
            where: { fassetId: req.body.user_id , userName:req.body.username},
            defaults: {
              countryCode: req.body.country_code,
            },
          });
      
          expect(result).toEqual({
            usercreated: true,
            userData: { id: 1, fassetId: 1,  countryCode: 'Pk' , userName:'xyz' },
          });
    });
    describe('updateUser', () => {
      beforeEach(() => {
        jest.clearAllMocks(); // Clear mock function calls before each test
      });
    
      it('should update user successfully', async () => {
        const req = {
          headers: {}, // Provide the required headers
          query: { user_id: '123' }, // Provide the required query parameters
          body: { user_name: 'newUsername' }, // Provide the required body data
        };
    
        // Mock the userdal.findAll function to return a user
        userdal.findAll.mockResolvedValueOnce([{ id: 1, fassetId: '123' }]);
    
        // Mock the userdal.updateById function
        userdal.updateById.mockResolvedValueOnce(req);
    
        const result = await UserService.updateUser(req);
    
        // Assert the expected result
        expect(result).not.toBeNull();
      });
    
      it('should throw an error when user is not found', async () => {
        const req = {
          headers: {},
          query: { user_id: '123' },
          body: { user_name: 'newUsername' },
        };
    
        // Mock the userdal.findAll function to return an empty array
        userdal.findAll.mockResolvedValueOnce([]);
    
        // Assert that the function throws a CustomError with the expected error code
        await expect(UserService.updateUser(req)).rejects.toThrowError(new CustomError(ERROR_CODES.USER_NOT_FOUND));
      });
    
      it('should throw an error when username is not unique', async () => {
        const req = {
          headers: {},
          query: { user_id: '123' },
          body: { user_name: 'newUsername' },
        };
    
       
     // Mock the userdal.findAll function to return a user with the same username
     userdal.findAll.mockReset();
     userdal.findAll.mockResolvedValue([{ id: 1, userName: 'newUsername' }]);
    
        // Assert that the function throws a CustomError with the expected error code
        await expect(UserService.updateUser(req)).rejects.toThrow(new CustomError(ERROR_CODES.USER_NAME_NOT_UNIQUE));
      });
    });
  
});
});
