import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

// TYPES
import { IssueType } from "../types";

// Queries
import { Issue } from "../models.js";

export const issue = {
  type: IssueType,
  args: {id: {type: new GraphQLNonNull(GraphQLID)}},
  resolve: (root, args) => Issue.findById(args.id).then( res => res.dataValues),
};

export const issues = {
  type: new GraphQLList(IssueType),
  resolve: (root, args) => Issue.findAll()
};