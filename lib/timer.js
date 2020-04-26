import moment from 'moment';

export default function Timer({ date }) {
  const timeDifference = Math.floor(((new Date().getTime() / 1000) - moment(date).unix()));
  let second = timeDifference;
  let minute = Math.floor(timeDifference / 60);
  let hour = Math.floor(timeDifference / 3600);
  let day = Math.floor(timeDifference / 86400);
  if(second < 60){
    return "yeni güncellendi";
  } else if (minute < 60) {
    return minute + " dk önce güncellendi";
  } else if (hour < 24)
    return hour + " sa önce güncellendi";
  else
    return day + " g önce güncellendi";
}