import React from 'react';
import { useNavigate } from 'react-router';
import ImageFrame from '../common/ImageFrame';
import FlexRowContainer from '../common/FlexRowContainer';
import styled from 'styled-components';

type Props = {
  galleryInfo: Data;
};

const Container = styled.div`
  margin: 0 2%;
`

const ImagesContainer = styled(FlexRowContainer)`
  flex-wrap: wrap;
  justify-content: start;
  gap: 15px 5%;
`;

function PicByDate({ galleryInfo: { date, thumnail, images } }: Props) {
  const navigate = useNavigate();

  function handleClick(image: string): void {
    navigate('/family/gallery/detail', { state: { src: image } });
  }
  function renderPicture() {
    const result = [];
    for (let i = 0; i < thumnail.length; i++) {
      result.push(
        <ImageFrame
          key={i}
          src={thumnail[i]}
          alt={`${date}${i}`}
          handleClick={handleClick}
          image={images[i]}
          $size="30%"
          $cursor="pointer"
        />,
      );
    }

    return <ImagesContainer>{result}</ImagesContainer>;
  }

  return (
    <Container>
      <p>{date}</p>
      {renderPicture()}
      <hr />
    </Container>
  );
}

export default PicByDate;
