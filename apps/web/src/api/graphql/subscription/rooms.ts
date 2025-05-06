import { gql } from '@apollo/client';

export const ROOM_STARTED_SUBSCRIPTION = gql`
  subscription RoomStarted($roomId: String!) {
    roomStarted(roomId: $roomId) {
      roomId
      message
    }
  }
`;

export const ROOM_WINNER_SUBSCRIPTION = gql`
  subscription RoomWinner($roomId: String!) {
    roomWinner(roomId: $roomId) {
      roomId
      winnerCard {
        id
        number
        numbers
        status
      }
      winnerUser {
        name
        username
        id
      }
    }
  }
`;
