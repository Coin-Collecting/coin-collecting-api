import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

// TYPES
import { DenominationType } from "../types";

// Queries
import { Denomination } from "../models.js";

export const denomination = {
  type: DenominationType,
  args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Denomination.findById(args.id).then( res => res.dataValues),
};

export const denominations = {
  type: new GraphQLList(DenominationType),
  resolve: (root, args) => Denomination.findAll()
};