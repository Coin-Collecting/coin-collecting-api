import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

// TYPES
import {
  CoinType,
} from "../types";

// Queries
import {
  Coin,
} from "../models.js";


import { findIndex } from 'lodash';

import { convertNodeToCursor, convertCursorToNodeId, Page } from '../types/pagination';

export const coin = {
  type: CoinType,
  args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => {
    return Coin.findById(args.id).then(res => res.dataValues);
  }
};

export const coins = {
  type: Page(CoinType),
  args: {
    cursor: { type: GraphQLString },
    count: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    order: { type: GraphQLString },
  },
  resolve: async (root, { count, cursor = 0, offset = 0, order }) => {
    if (!count) count = 20;
    let orderCol, orderDirection;

    if (typeof order === 'string') {
      orderCol = order.split('.')[0];
      orderDirection = order.split('.')[1];
    }

    if (cursor !==0) {
      cursor = convertCursorToNodeId(cursor)
    }

    let coins = await Coin.findAndCountAll({
      limit: count + 1,
      offset,
      where: {
        id: { $gt: cursor },
      },
      order: orderCol && orderDirection ?
        [[orderCol, orderDirection]] : undefined,
    });

    let totalCount = await Coin.count();

    let edges = coins.rows.map(node => ({
      node,
      cursor: convertNodeToCursor(node.id),
    }));

    let hasNextPage = edges.length > count;

    if (hasNextPage) edges.pop();

    return {
      totalCount,
      edges,
      pageInfo: {
        startCursor: edges.length > 0 ? edges[0].cursor : null,
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        hasNextPage,
      },
    };
  }
};