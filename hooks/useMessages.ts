import { getMessages } from '@/api/chat-api';
import React from 'react';

function useMessages() {
    const [messages, setMessages] = React.useState([]);
    React.useEffect(() => {
        const unsubscribe = getMessages(setMessages);

        return unsubscribe;
    }, []);

    return messages;
}

export { useMessages };