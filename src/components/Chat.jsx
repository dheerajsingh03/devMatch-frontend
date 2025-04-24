import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow, format } from 'date-fns';

// Format a timestamp using date-fns
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - date.getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 86_400_000) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, 'p'); // e.g. "09:45 AM"
}

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const socketRef = useRef(null);
  const containerRef = useRef(null);
  const endRef = useRef(null);

  // Fetch existing chat history
  const fetchChatMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
      const chatMessages = data.messages.map((msg) => ({
        id: msg._id,
        senderId: msg.senderId._id,
        firstName: msg.senderId.firstName,
        lastName: msg.senderId.lastName,
        text: msg.text,
        timestamp: msg.createdAt,
      }));
      setMessages(chatMessages);
    } catch (e) {
      setError('Failed to load messages.');
    } finally {
      setIsLoading(false);
    }
  }, [targetUserId]);

  // Initialize fetch and socket connection
  useEffect(() => {
    fetchChatMessages();
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id || Date.now(),
          senderId: msg.userId,
          firstName: msg.firstName,
          lastName: msg.lastName,
          text: msg.text,
          timestamp: msg.timestamp || Date.now(),
        },
      ]);
    });

    return () => socket.disconnect();
  }, [fetchChatMessages, user, userId, targetUserId]);

  // Auto-scroll when at bottom
  useEffect(() => {
    if (isAtBottom) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  // Track scroll position
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20);
  };

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    // Optimistically add own message so alignment is immediate
    const tempMessage = {
      id: `temp-${Date.now()}`,
      senderId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    socketRef.current.emit("sendMessage", {
      ...tempMessage,
    });
    setNewMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error} <button onClick={fetchChatMessages} className="underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div
        id="chat-container"
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-5"
        aria-live="polite"
      >
        {messages.map((msg) => {
          const isMine = msg.senderId === userId;
          const initials = `${msg.firstName.charAt(0)}${msg.lastName.charAt(0)}`;
          return (
            <div key={msg.id} className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>              
              {!isMine && (
                <div className="chat-image avatar">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                    {initials}
                  </div>
                </div>
              )}

              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}<time className="text-xs opacity-50"> {formatTime(msg.timestamp)}</time>
              </div>
              <div className={`chat-bubble ${isMine ? 'chat-bubble-secondary' : ''}`}>{msg.text}</div>
              {isMine && (
                <div className="chat-footer opacity-50">Seen</div>
              )}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {!isAtBottom && (
        <button
          onClick={() => endRef.current.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-24 right-8 px-3 py-1 bg-pink-600 text-white rounded"
        >
          ↓ New messages
        </button>
      )}

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <textarea
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-500 text-white rounded p-2 resize-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="btn btn-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
