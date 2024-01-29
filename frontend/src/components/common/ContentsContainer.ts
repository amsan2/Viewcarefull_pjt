import styled from 'styled-components';
import { white, main3 } from '../../assets/styles/palettes';
import FlexColContainer from './FlexColContainer';

const ContentsContainer = styled(FlexColContainer)`
  background-color: ${white};
  border: 2px solid ${main3};
  border-radius: 30px;
  margin: 20px 0;
  width: 90%;
  padding: 10px 0;
`;

export default ContentsContainer;