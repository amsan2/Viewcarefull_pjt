import React, { useState, useEffect } from 'react';
import { ReactComponent as EnvelopeClosed } from '../../assets/icons/envelopeClosed.svg';
import { ReactComponent as EnvelopeOpen } from '../../assets/icons/envelopeOpen.svg';
import styled from 'styled-components';
import FlexRowContainer from '../common/FlexRowContainer';
import { gray, black } from '../../assets/styles/palettes';
import { HiddenCheckBox, ShowCheckBox } from '../common/CheckBox';

type MessageProps = {
  openModal: (message: Message) => void;
  message: Message;
  isChecked: boolean;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    message: Message,
  ) => void;
};

function MessageSimple({
  openModal,
  message,
  isChecked,
  handleCheckboxChange,
}: MessageProps) {
  const [contentMaxLength, setContentMaxLength] = useState(
    window.innerWidth > 1200 ? 80 : 20,
  );

  const dateTime = new Date(message.time);
  const year = dateTime.getFullYear();

  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const date = ('0' + dateTime.getDate()).slice(-2);
  const hours = ('0' + dateTime.getHours()).slice(-2);
  const minutes = ('0' + dateTime.getMinutes()).slice(-2);

  const time = `${year}/${month}/${date} ${hours}:${minutes}`;

  useEffect(() => {
    function handleResize() {
      setContentMaxLength(window.innerWidth > 1200 ? 80 : 20);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <MainContainer>
      <div key={message.id}>
        <HiddenCheckBox
          id={`message-checkbox-${message.id}`}
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e, message)}
        />
        <ShowCheckBox
          htmlFor={`message-checkbox-${message.id}`}
          isChecked={isChecked}
        />

        <div onClick={() => openModal(message)}>
          <TitleContainer>
            <TitleText isRead={message.isRead}>
              {message.title.length > 10
                ? `${message.title.substring(0, 10)}...`
                : message.title}
            </TitleText>
            <ContentText isRead={message.isRead}>
              {message.content.length > contentMaxLength
                ? `${message.content.substring(0, contentMaxLength)}...`
                : message.content}
            </ContentText>
          </TitleContainer>
        </div>
        <FlexRowContainer
          $width="135px"
          $alignItems="center"
          $justifyContent="flex-start"
          $position="absolute"
          $right="6px"
          $top="0"
        >
          {message.isRead ? (
            <EnvelopeOpen
              width="20px"
              height="23px"
              style={{ marginRight: '2px' }}
            />
          ) : (
            <EnvelopeClosed
              width="20px"
              height="23px"
              style={{ marginRight: '2px' }}
            />
          )}
          <TimeText isRead={message.isRead}>{time}</TimeText>
        </FlexRowContainer>
      </div>
    </MainContainer>
  );
}

export default MessageSimple;

const TitleText = styled.div<{ isRead?: boolean }>`
  font-weight: bold;
  padding-bottom: 13px;
  color: ${(props) => (props.isRead ? gray : black)};
`;

const ContentText = styled(TitleText)`
  font-weight: normal;
`;

const TimeText = styled.div<{ isRead?: boolean }>`
  font-size: 13px;
  padding-bottom: 2px;
  margin-left: 2px;
  color: ${(props) => (props.isRead ? gray : black)};
`;

const MainContainer = styled.div`
  margin: 10px 0 0 20px;
`;

const TitleContainer = styled.div`
  margin: 0 0 0 20px;
`;
