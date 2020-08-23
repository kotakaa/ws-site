import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSinedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getProductsInFavorite = createSelector(
  [usersSelector],
  state => state.favorite
)

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
)

export const getRole = createSelector(
  [usersSelector],
  state => state.role
)