import { gql } from '@apollo/client';

import { ROOM_FRAGMENT } from '../fragments';

export const GET_ROOMS = gql`
  query Rooms {
    rooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

export const GET_ROOM = gql`
  query Room($id: String!) {
    room(id: $id) {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;
