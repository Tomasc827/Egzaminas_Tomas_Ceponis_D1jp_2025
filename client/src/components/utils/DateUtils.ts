// Utility function for formatting dates
export const formatDate = (dateString:string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format as time
  export const formatTime = (dateString:string) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  

  export const formatDateTime = (dateString:string) => {
    return `${formatDate(dateString)} ${formatTime(dateString)}`;
  };
  

  export const isDatePast = (dateString:string) => {
    return new Date(dateString) < new Date();
  };
  

  export const daysBetween = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  };