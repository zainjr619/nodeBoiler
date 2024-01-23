const userRouter = require('../user');

describe('route/user', () => {
  it('should have expected /register route', async () => {
    const path = '/register';
    const result = userRouter.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });
});