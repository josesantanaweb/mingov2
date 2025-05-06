import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    balance
    username
    raking
    email
    image
    createdAt
    updatedAt
  }
`;

export const CARD_FRAGMENT = gql`
  fragment CardFragment on Card {
    id
    number
    numbers
    status
    createdAt
    updatedAt
  }
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomFragment on Room {
    id
    name
    award
    price
    time
    createdAt
    status
    updatedAt
    drawnNumbers
    users {
      ...UserFragment
    }
    cards {
      ...CardFragment
    }
  }
  ${USER_FRAGMENT}
  ${CARD_FRAGMENT}
`;
