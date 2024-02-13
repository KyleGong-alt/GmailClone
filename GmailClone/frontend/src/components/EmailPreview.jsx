import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import List from '@mui/material/List';
import {useNavigate} from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import './EmailPreview.css';

// import countMailFromMailbox from './Drawer';
// https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
/**
 *
 * @param {*} time
 * @return {object}
 */
function showTime(time) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  //   const currentHour = currentDate.getHours();
  //   const currentMinute = currentDate.getMinutes();

  const date = new Date(time);
  //   console.log('date in db', date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let minute = date.getMinutes();
  let hour = date.getHours();

  const DayOfMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (minute < 10) {
    minute = '0' + minute;
  }
  if (year === currentYear && month === currentMonth && day === currentDay) {
    if (hour <= 11) {
      return hour + ':' + minute + ' AM';
    } else {
      hour -= 12;
      return hour + ':' + minute + ' PM';
    }
  } else if (
    year === currentYear &&
    month === currentMonth &&
    day === currentDay - 1
  ) {
    return 'Yesterday';
  } else if (year === currentYear) {
    return DayOfMonths[month] + ' ' + day;
  } else {
    return year;
  }
}

/**
 *
 * @param {object} email
 * @return {*}
 */
export default function EmailPreview({email, putMail, updateAllEmails}) {
  const navigate = useNavigate();
  const {id, sentfrom, mail} = email;
  const {content, received, subject} = mail;

  const handleFavoriteClick = (favorite) => {
    email.favorite = favorite;
    putMail([email]);

    updateAllEmails();
  };

  const handleMailOpen = () => {
    navigate(`v0/user/` + id);
  };

  return (
    <div>
      <div
        onClick={handleMailOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          flexDirection: 'row',
        }}
      >
        <Avatar alt='A Sharp' src='/static/images/avatar/2.jpg' />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={email.viewed ? 'null' : 'bold'}>{sentfrom}</div>
          <div className={email.viewed ? 'null' : 'bold'}>{subject}</div>
          <div>{content}</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <List>{showTime(received)}</List>
          <IconButton
            onClick={handleFavoriteClick.bind(this, email.favorite ? 0 : 1)}
          >
            {email.favorite ? <StarIcon /> : <StarBorderOutlinedIcon />}
          </IconButton>
        </div>
      </div>
      <br></br>
    </div>
  );
}
