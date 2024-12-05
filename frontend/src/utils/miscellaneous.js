export const formatMessageTime = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();

    const isSameDay = (date1, date2) => 
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

    if (isSameDay(messageDate, now)) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(messageDate, yesterday)) {
        return "Yesterday";
    }

    if (messageDate.getFullYear() === now.getFullYear()) {
        return messageDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    }

    return messageDate.toLocaleDateString('en-GB');
}
