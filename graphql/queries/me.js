// TYPES
import { UserType } from "../types";

// Queries
import { User } from "../models.js";

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