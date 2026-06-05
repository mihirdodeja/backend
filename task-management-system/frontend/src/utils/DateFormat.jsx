import moment from "moment";

const DateFormat = (date) => {
  return moment(date).format("Do MMMM YYYY");
  
}

export default DateFormat