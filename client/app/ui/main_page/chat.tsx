'use client';

import { useState, useRef, ChangeEvent, KeyboardEvent, FC } from 'react';
import Image from 'next/image';
import Message from './message';

const ChatComponent: FC = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle sending a message.
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // For demonstration, we add the message locally.
    // Replace with an API call if needed.
    setChatMessages(prev => [inputValue, ...prev]);

    // Clear and reset the textarea.
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Handle textarea input and adjust height.
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Listen for the Enter key (without Shift) to send a message.
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div id="main-container" className="flex h-full max-h-[calc(100dvh-4.5rem)] w-full flex-col">
      <div
        id="chat"
        className="flex h-full w-full flex-grow flex-col-reverse overflow-auto rounded-lg bg-[#332F4B] p-2 outline outline-2 outline-[#443F64]"
      >
        {chatMessages.map((msg, index) => (
          <>
            <Message key={index} type='contact' text={msg}></Message>
            <Message key={index} type='user' text={msg}></Message>
          </>
        ))}
      </div>
      <div className="flex flex-row">
        <textarea
          placeholder="Type your message..."
          id="input-area"
          name="input-area"
          ref={textareaRef}
          className="mt-3 max-h-20 w-full resize-none overflow-y-scroll rounded-lg bg-[#332F4B] p-2 text-gray-50 outline outline-2 outline-[#443F64]"
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className="ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center self-end">
          <button type="button" className="flex h-8 w-8" onClick={sendMessage}>
            <Image
              src="/send_icon.png"
              width={32}
              height={32}
              alt="Send"
              className="object-scale-down"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
