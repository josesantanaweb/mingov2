import { gql } from '@apollo/client';

export const ADD_USER_TO_ROOM = gql`
  mutation Mutation($input: AddUserToRoomInput!) {
    addUserToRoom(input: $input)
  }
`;

export const ANNOUNCE_NUMBER = gql`
  mutation AnnounceNumber($roomId: String!) {
    announceNumber(roomId: $roomId)
  }
`;
