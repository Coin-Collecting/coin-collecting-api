// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import {
  coin,
  coins,
  denomination,
  denominations,
  issues,
  issue,
  mint,
  mints,
  me,
} from './queries';

import {
  registerUser,
  loginUser,
} from './mutations';


// QUERIES
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    coin,
    coins,
    denomination,
    denominations,
    issues,
    issue,
    mint,
    mints,
    me,
  }),
});

// MUTATIONS
const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'These are the things we can change',
  fields: () => ({
    registerUser,
    loginUser,
  }),
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
