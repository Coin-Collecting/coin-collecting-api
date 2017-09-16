import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

// TYPES
import { MintType } from "../types";

// Queries
import { Mint } from "../models.js";

export const mint = {
  type: MintType,
  args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Mint.findById(args.id).then( res => res.dataValues),
};

export const mints = {
  type: new GraphQLList(MintType),
  resolve: (root, args) => Mint.findAll()
};
