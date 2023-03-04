import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragIcon, DeleteIcon } from './styledComponents/AdminComponents';
import { useDrag, useDrop } from 'react-dnd';
import {
  reorder,
  reorderDataBase,
  deleteProject,
} from '../../redux/projectsSlice';
import { useDispatch } from 'react-redux';

const ProjectListItem = ({ title, pos, databasePos, id }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation(e);
  };

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'project',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop(item, monitor) {
      //console.log(databasePos, pos + 1, id);
      dispatch(reorderDataBase(databasePos, pos + 1, id));
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.pos;
      const hoverIndex = pos;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorder([dragIndex, hoverIndex]));
      item.pos = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'project',
    item: () => {
      return { pos };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(preview(ref));

  return (
    <Link
      ref={ref}
      pos={pos}
      to={`/admin/edit-projects/${title}`}
      className="list-group-item list-group-item-action "
      style={{ display: 'flex' }}
    >
      <div ref={drag}>
        <DragIcon />
      </div>

      {title}
      <DeleteIcon
        onClick={(e) => {
          e.preventDefault();
          dispatch(deleteProject(id, title));
        }}
      />
    </Link>
  );
};

export default ProjectListItem;
