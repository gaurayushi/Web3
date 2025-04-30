export const noteColors = [
    { name: 'Yellow', value: 'bg-yellow-200' },
    { name: 'Red', value: 'bg-red-200' },
    { name: 'Blue', value: 'bg-blue-200' },
  ];
  
  export const getNotes = () => {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : [];
  };
  
  export const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    return `${date.toLocaleTimeString([], options)}, ${day}`;
  };
  