const UserController = require('../user');
const UserService = require('../../service/user');

describe('controller/user', () => {
  describe('registerUser()', () => {
    const createUserResult = {
        usercreated: true,
        userData: {
            id: 1,
            name: 'test',
            countryCode: 'PK',
            fassetId: 16,
            updatedAt:' 2023-03-07T10:24:07.479Z',
            createdAt: '2023-03-07T10:24:07.479Z'
        }
    };
    const reqData={
             user_id: 1,
             user_name: 'test',
             country_code: 'Pk',
    }

    it('should return on success - user register data', async () => {
      const result = createUserResult;
      const req = { reqData };
      const res = {
        status: jest.fn().mockReturnThis(),
        result,
      };
      const next = jest.fn();

      jest
        .spyOn(UserService, 'registerUser')
        .mockResolvedValueOnce(result);
      await UserController.registerUser(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.result).toEqual(result);
    });
  });
});
