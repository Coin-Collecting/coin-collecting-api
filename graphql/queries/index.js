// DEPENDENCIES
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

// TYPES
import {
  CoinType,
  MintType,
  CompositionType,
  DenominationType,
  DesignerType,
  EdgeType,
  ImageType,
  IssueType,
  VarietyType,
  UserType,
} from "../types";

// Queries
import {
  Mint,
  Coin,
  Composition,
  Denomination,
  Designer,
  Edge,
  Image,
  Issue,
  Variety,
  User,
} from "../models.js";


import { findIndex } from 'lodash';

import { convertNodeToCursor, convertCursorToNodeId, Page } from '../types/pagination';

export const me = {
  type: UserType,
  resolve: (root, { id }, context) => {
    if (context.user) {
      return User.findById(context.user.id).then(res => res.dataValues);
    } else {
      return null;
    }
  }
};

export const coin = {
  type: CoinType,
  args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => {
    return Coin.findById(args.id).then(res => res.dataValues);
  }
};


export const coins2 = {
  type: new GraphQLList(CoinType),
  args: {
    cursor: { type: GraphQLString },
    limit: { type: GraphQLInt },
  },
  resolve: async (root, { limit = 20, cursor }) => {

    let coins = await Coin.findAll({
      limit,
      where: {
        id: { $gt: 10 },
      },
    });

    let newCursor = convertNodeToCursor(coins[0].id);
    console.log({newCursor});
    return coins;
  }
};

export const coins = {
  type: Page(CoinType),
  args: {
    cursor: { type: GraphQLString },
    count: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
  resolve: async (root, { count, cursor = 0, offset = 0 }) => {
    if (!count) count = 20;

    if (cursor !==0) {
      cursor = convertCursorToNodeId(cursor)
    }

    let coins = await Coin.findAndCountAll({
      limit: count + 1,
      offset,
      where: {
        id: { $gt: cursor },
      },
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

export const composition = {
  type: CompositionType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Composition.findById(args.id).then( res => res.dataValues),
};

export const compositions = {
  type: new GraphQLList(CompositionType),
    resolve: (root, args) => Composition.findAll()
};

export const denomination = {
  type: DenominationType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Denomination.findById(args.id).then( res => res.dataValues),
};

export const denominations = {
  type: new GraphQLList(DenominationType),
    resolve: (root, args) => Denomination.findAll()
};

export const designer = {
  type: DesignerType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Designer.findById(args.id).then( res => res.dataValues),
};

export const designers = {
  type: new GraphQLList(DesignerType),
    resolve: (root, args) => Designer.findAll()
};

export const edge = {
  type: EdgeType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Edge.findById(args.id).then( res => res.dataValues),
};

export const edges = {
  type: new GraphQLList(EdgeType),
    resolve: (root, args) => Edge.findAll()
};

export const image = {
  type: ImageType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Image.findById(args.id).then( res => res.dataValues),
};

export const images = {
  type: new GraphQLList(ImageType),
    resolve: (root, args) => Image.findAll()
};

export const issue = {
  type: IssueType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Issue.findById(args.id).then( res => res.dataValues),
};

export const issues = {
  type: new GraphQLList(IssueType),
    resolve: (root, args) => Issue.findAll()
};

export const mint = {
  type: MintType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Mint.findById(args.id).then( res => res.dataValues),
};

export const mints = {
  type: new GraphQLList(MintType),
    resolve: (root, args) => Mint.findAll()
};

export const variety =  {
  type: VarietyType,
    args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Variety.findById(args.id).then( res => res.dataValues),
};

export const varieties = {
  type: new GraphQLList(VarietyType),
    resolve: (root, args) => Variety.findAll()
};