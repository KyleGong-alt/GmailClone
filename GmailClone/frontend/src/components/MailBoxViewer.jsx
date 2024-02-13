import {useNavigate} from 'react-router-dom';
import PersistentDrawerLeft from './Drawer';
import EmailPreview from './EmailPreview';

/**
 *
 * @return {object}
 *
 *
 */
function MailBoxView({
  emails,
  putMail,
  updateAllEmails,
  onViewChange,
  mailBoxView,
  mailBoxViewKey,
}) {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('user');
    console.log('In onlogout button');
    navigate('/Login');
  };

  const filteredMail = (key, value) => {
    // key is either favorite or any other mailbox, value is 1 and mailbox name
    const array = [];
    emails.forEach((email) => {
      if (email[key] === value) {
        array.push(
          <EmailPreview
            key={email.id}
            email={email}
            putMail={putMail}
            updateAllEmails={updateAllEmails}
            mailBoxView={mailBoxView}
          />
        );
      }
    });
    return array;
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <div style={{display: 'flex'}}>
        <div
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          {mailBoxView === 1 ? 'favorite' : mailBoxView}
        </div>
      </div>
      {filteredMail(mailBoxViewKey, mailBoxView)}
      <PersistentDrawerLeft
        onViewChange={onViewChange}
        onLogout={onLogout}
        onMail={emails}
        onMailBox={mailBoxView}
        onMailBoxViewKey={mailBoxViewKey}
      />
    </div>
  );
}

export default MailBoxView;
