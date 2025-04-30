
  export const getNotes = () => {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : [];
  };
  
  export const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    return `${date.toLocaleTimeString([], options)}, ${day}`;
  };
  