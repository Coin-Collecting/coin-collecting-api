// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import { IssueType } from '../types';
import { Issue } from '../models';

// COIN TYPE
export const CoinType = new GraphQLObjectType({
  name: 'Coin',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Coin Type',
      resolve: obj => obj.id,
    },
    issue: {
      type: IssueType,
      description: '...',
      resolve: obj => Issue.findById(obj.issue_id).then( res => res.dataValues),
    },
    mint: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.mint,
    },
    mintage: {
      type: GraphQLFloat,
      description: '...',
      resolve: obj => obj.mintage,
    },
    year: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.year,
    },
    description: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.description,
    }
  }),
});
