import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";

function Conversation() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [userTwo, setUserTwo] = useState(null);

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("UserID");
    const { ConversationID } = useParams();

    async function getMessages() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ConversationID: parseInt(ConversationID, 10) })
        });
        const data = await response.json();
        setMessages(data.messages);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, ConversationID, UserID: userID })
        });

        const data = await response.json();
        setMessages(prev => [...prev, data.message]);
        setText("");
    }

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        // Make sure both IDs are the same type before comparing
        const myID = parseInt(userID, 10);

        const otherUserMessage = messages.find(msg => parseInt(msg.UserID, 10) !== myID);

        if (otherUserMessage && otherUserMessage.User && parseInt(otherUserMessage.User.id, 10) !== myID) {
            setUserTwo(otherUserMessage.User);
        }
    }, [messages, userID]);

    if (!token || token === "undefined") return <Navigate to="/login" />;

 return (
    <div className="conversation_container">
        <Nav />

        <div className="conversation-grid">
            {userTwo && (
                <div className="conversation-header">
                    <img src={userTwo.image} alt="User avatar" />
                    <h2>{userTwo.displayName}</h2>
                </div>
            )}

            <ul className="messages-list">
                {messages.map(msg => (
                    <li
                        key={msg.id}
                        className={msg.UserID == userID ? "message sender" : "message receiver"}
                    >
                        <span className="message-time">
                            {new Date(msg.sent_at).toISOString().split("T")[1].slice(0, 5)}
                        </span>
                        <p>{msg.text}</p>
                    </li>
                ))}
            </ul>

            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
);

}

export default Conversation;
