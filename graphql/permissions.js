const { UserError } = require('graphql-errors');

const createResolver = resolver => {
  const baseResolver = resolver;
  baseResolver.createResolver = childResolver => {
    const newResolver = async (parent, args, context) => {
      await resolver(parent, args, context);
      return childResolver(parent, args, context);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver((parent, args, context) => {
  if (!context.user || !context.user.id) throw new UserError('User is not logged in');
});

export const requiresAdmin = requiresAuth.createResolver((parent, args, context) => {
  if (!context.user.isAdmin) throw new UserError('Requires Admin Access');
});