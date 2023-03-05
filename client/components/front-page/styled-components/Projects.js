import styled from 'styled-components';

export const ProjectsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Project = styled.div`
  height: 27vw;
  width: 22vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin: 0 15px;
  img {
    width: auto;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
