'use client';

import React from 'react';
import { MessageType } from './chat';


interface MessageBubbleProps {
  message: MessageType
}

const Message: React.FC<MessageBubbleProps> = ({ message }: MessageBubbleProps) => {
  // Determine container alignment and bubble background based on message type.
  const containerClass =
    message.type === 'user'
      ? 'flex w-full h-fit flex-none justify-end my-1'
      : 'flex w-full h-fit flex-none justify-start my-1';
  const bubbleClass =
    message.type === 'user'
      ? 'w-fit max-w-[80%] h-fit bg-[#3476AD] rounded-2xl px-2 py-1'
      : 'w-fit max-w-[80%] h-fit bg-[#443F64] rounded-2xl px-2 py-1';

  return (
    <div className={containerClass}>
      <div className={bubbleClass}>
        <p className="text-lg text-gray-50 break-words whitespace-pre-wrap overflow-wrap-anywhere">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;
