import styled from 'styled-components';
import { UilDraggabledots, UilTrashAlt } from '@iconscout/react-unicons';

export const Image = styled.img`
  width: 70%;
`;

export const List = styled.div`
  width: 70%;
`;

export const DragIcon = styled(UilDraggabledots)`
  width: 60px;
  :hover {
    cursor: grab;
  }
  :active {
    cursor: grabbing;
  }
`;

export const DeleteIcon = styled(UilTrashAlt)`
  width: 60px;
  color: red;
`;
