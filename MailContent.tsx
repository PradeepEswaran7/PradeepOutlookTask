import React, { useState } from 'react';
import './MailContent.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { format, isToday, isYesterday, parseISO, startOfWeek, endOfWeek } from 'date-fns';

interface Email {
  sender: string;
  subject: string;
  message: string;
  time: string;
}

const emails: Email[] = [
  {
    sender: 'Waves',
    subject: 'Good Morning !!!',
    message: 'Good Morning !!!',
    time: '2024-07-24T10:46:57.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-07-23T10:40:57.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Good Morning !!!',
    message: 'Good Morning !!!',
    time: '2024-07-22T10:46:57.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-07-21T10:40:57.000Z',
  },
  {
    sender: 'Kamesh S',
    subject: 'React Session',
    message: 'React Session',
    time: '2024-07-18T14:44:00.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-06-25T14:44:00.000Z',
  },
  {
    sender: 'Kamesh S',
    subject: 'Daily Standup Meeting',
    message: 'Daily Standup Meeting',
    time: '2024-06-25T14:44:00.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-06-24T14:44:00.000Z',
  },
  {
    sender: 'Kamesh S',
    subject: 'Daily Standup Meeting',
    message: 'Daily Standup Meeting',
    time: '2024-06-24T14:44:00.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-06-23T14:44:00.000Z',
  },
  {
    sender: 'Kamesh S',
    subject: 'Daily Standup Meeting',
    message: 'Daily Standup Meeting',
    time: '2024-06-22T14:44:00.000Z',
  },
  {
    sender: 'Waves',
    subject: 'Many More Happy Returns of the Day',
    message: 'Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.Waves wishes you Happy Birthday. May God bless you with all good things in your life. Hope your birthday blossoms in to lots of dreams come true!.',
    time: '2024-06-18T14:44:00.000Z',
  },
];

const MailContent: React.FC = () => {
  // Define a type that includes all possible keys for the display state
  type DisplayState = {
    [key: string]: boolean;
  };

  const [display, setDisplay] = useState<DisplayState>({
    Today: false,
    Yesterday: false,
    Wednesday: false,
  });

  const toggleDisplay = (group: string) => {
    setDisplay((prevDisplay) => ({
      ...prevDisplay,
      [group]: !prevDisplay[group],
    }));
  };

  const determineEmailGroup = (time: string): string => {
    const date = parseISO(time);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    
    // Check if date is within the current week (Monday to Sunday)
    const today = new Date();
    const startOfThisWeek = startOfWeek(today);
    const endOfThisWeek = endOfWeek(today);
    
    if (date >= startOfThisWeek && date <= endOfThisWeek) {
      return format(date, 'EEEE'); // Day of the week, e.g., 'Monday'
    }
    
    return 'Older';
  };
  const groupedEmails: { [key: string]: Email[] } = {};

  // Group emails
  emails.forEach((email) => {
    const group = determineEmailGroup(email.time);
    if (!groupedEmails[group]) {
      groupedEmails[group] = [];
    }
    groupedEmails[group].push(email);
  });

  const truncateText = (text: string, maxLength: number, content: string) => {
    if (content === 'subject') {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
    } else if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  };

  const formatTime = (time: string) => {
    const date = parseISO(time);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else {
      return format(date, 'EEE HH:mm'); // Formats as "Tue 08:19"
    }  
  };

  return (
    <div className="App">
      <div className="container">
        {Object.keys(groupedEmails).map((group) => (
          <div key={group}>
            <div className="day" onClick={() => toggleDisplay(group)}>
              {display[group] ? <ArrowDropDownIcon  /> : <ArrowRightIcon data-testId="ArrowRightIcon"/>} {group}
            </div>
            {display[group] &&
              groupedEmails[group].map((val, index) => (
                <div className="row" key={index}>
                  <p className="sender">{val.sender}</p>
                  <p className="subject">{truncateText(val.subject, 20, 'subject')}</p>
                  <p className="time-day">{formatTime(val.time)}</p>
                  <p className="message">{truncateText(val.message, 31, 'message')}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MailContent;
