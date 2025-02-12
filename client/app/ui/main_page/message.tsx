'use client';

import React from 'react';

export type MessageType = 'contact' | 'user';

interface MessageBubbleProps {
  text: string;
  type: MessageType;
}

const Message: React.FC<MessageBubbleProps> = ({ text, type }) => {
  // Determine container alignment and bubble background based on message type.
  const containerClass =
    type === 'user'
      ? 'flex w-full h-fit flex-none justify-end my-1'
      : 'flex w-full h-fit flex-none justify-start my-1';
  const bubbleClass =
    type === 'user'
      ? 'w-fit max-w-[80%] h-fit bg-[#3476AD] rounded-2xl px-2 py-1'
      : 'w-fit max-w-[80%] h-fit bg-[#443F64] rounded-2xl px-2 py-1';

  return (
    <div className={containerClass}>
      <div className={bubbleClass}>
        <p className="text-lg text-gray-50 break-words whitespace-pre-wrap overflow-wrap-anywhere">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Message;
