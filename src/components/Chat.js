// src/components/Chat.js
import { useState, useEffect } from 'react';
import { ref, onChildAdded, push } from 'firebase/database';
import { db, auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Chat = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [suggestedReplies, setSuggestedReplies] = useState([]);

    useEffect(() => {
        let unsubscribeMessages;

        const handleAuthStateChange = (user) => {
            setUser(user);

            if (user) {
                const messagesRef = ref(db, 'messages');
                const handleNewMessage = (snapshot) => {
                    const newMessage = snapshot.val();
                    setMessages((prevMessages) => [...prevMessages, newMessage]);

                    if (newMessage.user !== user.displayName) {
                        const newSuggestions = getSuggestions(newMessage.text);
                        setSuggestedReplies(newSuggestions);
                    }
                };

                unsubscribeMessages = onChildAdded(messagesRef, handleNewMessage);
            } else {
                if (unsubscribeMessages) unsubscribeMessages();
                setMessages([]);
                setSuggestedReplies([]);
            }
        };

        const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChange);

        // Cleanup function
        return () => {
            if (unsubscribeAuth) unsubscribeAuth();
            if (unsubscribeMessages) unsubscribeMessages();
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const messagesRef = ref(db, 'messages');
        push(messagesRef, {
            text: message,
            user: user.displayName,
        });
        setMessage('');
    };

    const getSuggestions = (message) => {
        const suggestions = [];
        if (message.includes("hello")) {
            suggestions.push("Hi there!");
            suggestions.push("Hello! How can I help you?");
        }
        if (message.includes("how are you")) {
            suggestions.push("I'm doing great, thanks for asking!");
            suggestions.push("I'm good, how about you?");
        }
        if (message.includes("bye")) {
            suggestions.push("Goodbye!");
            suggestions.push("See you later!");
        }
        return suggestions;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {user ? (
                <div className="w-full max-w-md bg-white rounded shadow-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Chat</h2>
                        <button
                            onClick={() => signOut(auth)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sign Out
                        </button>
                    </div>
                    <ul className="mb-4 h-64 overflow-y-scroll">
                        {messages.map((msg, index) => (
                            <li key={index} className="mb-2">
                                <span className="font-bold">{msg.user}: </span>
                                {msg.text}
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSendMessage} className="flex mb-4">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border rounded w-full p-2 mr-2"
                            placeholder="Type a message..."
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Send
                        </button>
                    </form>
                    <div>
                        <h3 className="text-lg font-bold mb-2">Suggestions:</h3>
                        <ul>
                            {suggestedReplies.map((suggestion, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={() => setMessage(suggestion)}
                                        className="bg-gray-200 px-4 py-2 rounded"
                                    >
                                        {suggestion}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Sign In with Google
                </button>
            )}
        </div>
    );
};

export default Chat;
