import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ReplyIcon from '@mui/icons-material/Reply';

import {useNavigate, useParams} from 'react-router-dom';

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
  const date = new Date(time);
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
 * @return {object}
 *
 *
 *
 */
export default function ViewEmail({
  emails,
  mailBoxView,
  putMail,
  updateAllEmails,
}) {
  const {id} = useParams();
  const navigate = useNavigate();

  const email = emails.find((email) => {
    return email.id === id;
  });
  const handleFavoriteClick = (favorite) => {
    email.favorite = favorite;
    putMail([email]);

    updateAllEmails();
  };

  useEffect(() => {
    if (!email) {
      return;
    }

    if (!email.viewed) {
      email.viewed = 1;

      putMail([email]);

      updateAllEmails();
    }
  });

  if (!email) {
    return <div>Loading email</div>;
  }
  const {subject, content, received} = email.mail;
  const {sentfrom, sentfromemail} = email;

  const goBack = () => {
    navigate('/');
  };

  return (
    // Icons on top of page
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <IconButton onClick={goBack}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </IconButton>
        <div style={{display: 'flex'}}>
          <IconButton>
            {' '}
            <MarkunreadMailboxIcon />{' '}
          </IconButton>
          <IconButton>
            {' '}
            <DownloadIcon />{' '}
          </IconButton>
          <IconButton onClick={goBack}>
            {' '}
            <DeleteIcon />{' '}
          </IconButton>
        </div>
      </div>

      {/* subject header */}
      <h3 style={{display: 'flex'}}>{subject}</h3>

      {/* Sends which mailbox you are currently in */}
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div
          style={{
            backgroundColor: 'lightgrey',
            padding: '5px',
            fontSize: '20px',
          }}
        >
          {mailBoxView === 1 ? 'favorite' : mailBoxView}
        </div>
        <div>
          <IconButton
            onClick={handleFavoriteClick.bind(this, email.favorite ? 0 : 1)}
          >
            {email.favorite ? <StarIcon /> : <StarBorderOutlinedIcon />}
          </IconButton>
        </div>
      </div>

      <br></br>
      <br></br>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Avatar alt='A Sharp' src='/static/images/avatar/2.jpg' />
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>{sentfrom}</div>
            <div>{sentfromemail}</div>
          </div>
          {showTime(received)}
        </div>
        <IconButton>
          <ReplyIcon />
        </IconButton>
      </div>
      <br></br>
      <div>{content}</div>
    </div>
  );
}
