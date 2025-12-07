import { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Image, Paperclip, Smile, ArrowLeft, Plus, FileText, User } from 'lucide-react';

const Messages = () => {
    const [activeChat, setActiveChat] = useState(null); // Start with null to show list on mobile
    const [messageInput, setMessageInput] = useState('');
    const [showAttachments, setShowAttachments] = useState(false);

    const conversations = [
        {
            id: 1,
            name: 'Arun Kapoor',
            avatar: 'https://i.pravatar.cc/150?img=11',
            lastMessage: 'When can I come to visit Bruno?',
            time: '10:30 AM',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Priya Singh',
            avatar: 'https://i.pravatar.cc/150?img=5',
            lastMessage: 'Thank you for the update!',
            time: 'Yesterday',
            unread: 0,
            online: false
        },
        {
            id: 3,
            name: 'Rahul Sharma',
            avatar: 'https://i.pravatar.cc/150?img=3',
            lastMessage: 'I found another injured dog near...',
            time: 'Yesterday',
            unread: 0,
            online: true
        }
    ];

    const messages = [
        { id: 1, sender: 'them', text: 'Hi, I am interested in adopting Bruno.', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hello Arun! That is great to hear. Bruno is a lovely dog.', time: '10:05 AM' },
        { id: 3, sender: 'them', text: 'I have filled out the adoption form.', time: '10:15 AM' },
        { id: 4, sender: 'me', text: 'Perfect, I see it here. Your profile looks good.', time: '10:20 AM' },
        { id: 5, sender: 'them', text: 'When can I come to visit Bruno?', time: '10:30 AM' }
    ];

    // Helper to get active chat data safely
    const activeConversation = activeChat ? conversations.find(c => c.id === activeChat) : null;

    return (
        <div className="h-[calc(100vh-7rem)] glass-card rounded-2xl overflow-hidden flex animate-fadeIn relative">
            {/* Sidebar */}
            <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col bg-white absolute md:relative z-10 h-full transition-transform duration-300 ${activeChat ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Messages</h2>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-100"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-gold-50 border-r-4 border-gold-500' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`font-semibold truncate ${activeChat === chat.id ? 'text-gold-900' : 'text-gray-800'}`}>
                                        {chat.name}
                                    </h3>
                                    <span className="text-xs text-gray-400">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${activeChat === chat.id ? 'text-gold-700' : 'text-gray-500'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-gray-50/50 w-full md:w-auto absolute md:relative h-full transition-transform duration-300 ${activeChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gold-600"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <img
                                    src={activeConversation.avatar}
                                    alt="Active User"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-800">{activeConversation.name}</h3>
                                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        {activeConversation.online ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400">
                                <button className="hover:text-gold-600 transition-colors"><Phone size={20} /></button>
                                <button className="hover:text-gold-600 transition-colors"><Video size={20} /></button>
                                <button className="hover:text-gray-600 transition-colors"><MoreVertical size={20} /></button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${msg.sender === 'me'
                                            ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gold-100' : 'text-gray-400'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowAttachments(!showAttachments)}
                                        className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gold-50 hover:text-gold-600 transition-colors"
                                    >
                                        <Plus size={20} className={`transition-transform duration-300 ${showAttachments ? 'rotate-45' : ''}`} />
                                    </button>

                                    {/* Attachment Menu */}
                                    {showAttachments && (
                                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn z-20">
                                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                                                <Image size={18} className="text-blue-500" />
                                                <span className="text-sm font-medium">Photos & Videos</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                                                <FileText size={18} className="text-purple-500" />
                                                <span className="text-sm font-medium">Document</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                                                <User size={18} className="text-gold-500" />
                                                <span className="text-sm font-medium">Contact</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-gold-300 focus-within:ring-2 focus-within:ring-gold-100 transition-all flex items-center px-4 py-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 min-w-0"
                                    />
                                    <button className="p-1 text-gray-400 hover:text-gold-600 transition-colors ml-2">
                                        <Smile size={20} />
                                    </button>
                                </div>

                                <button
                                    className="p-3 bg-gold-500 text-white rounded-xl hover:bg-gold-600 transition-colors shadow-md flex-shrink-0"
                                    onClick={() => setMessageInput('')}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-500">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Send size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your Messages</h3>
                        <p className="max-w-xs mx-auto">Select a conversation from the list to start chatting or send a new message.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
