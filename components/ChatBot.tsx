"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { MessageCircle, Send, X, Bot } from "lucide-react"

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Add auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm your SanBi Solutions assistant. How can I help you today? You can ask me about our services, company information, or any cybersecurity questions."
      }
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment before trying again.');
        }
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: error instanceof Error ? error.message : 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isChatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-96 bg-white/10 backdrop-blur-lg border border-white/20 dark:bg-gray-900/10 rounded-2xl shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 dark:border-gray-800/50 flex justify-between items-center backdrop-blur-md rounded-t-2xl bg-white/30 dark:bg-gray-900/30">
              <div className="flex items-center gap-2">
                <Image
                  src="/bot-avatar.png"
                  alt="Bot Avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  SanBi Assistant
                </h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 dark:scrollbar-thumb-gray-800/50 scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  key={index}
                  className={`flex items-end gap-2 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Image
                        src="/bot-avatar.png"
                        alt="Bot Avatar"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white ml-4'
                        : 'bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm text-gray-800 dark:text-white mr-4'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Image
                      src="/bot-avatar.png"
                      alt="Bot Avatar"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-3 text-gray-800 dark:text-white">
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/20 dark:border-gray-800/50 backdrop-blur-md rounded-b-2xl bg-white/30 dark:bg-gray-900/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-xl bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="group relative"
          >
            <div className="absolute -top-12 left-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm text-gray-900 dark:text-white whitespace-nowrap">Chat with us</p>
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white/80 dark:bg-gray-900/80 transform rotate-45"></div>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow duration-300">
              <Image
                src="/bot-avatar.png"
                alt="Chat Bot"
                width={24}
                height={24}
                className="rounded-full transform scale-x-[-1]"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
} 