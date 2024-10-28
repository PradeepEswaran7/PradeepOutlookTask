import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { format, parseISO } from 'date-fns';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import '@testing-library/jest-dom/extend-expect';
import MailContent from './MailContent'; // Adjust the import path as necessary
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


test('renders MailContent component', () => {
  render(<MailContent/>);
  // expect(screen.getByText('Older')).toBeInTheDocument();
});
 
test('initially groups are collapsed', () => {
  render(<MailContent/>);
  const groups = ['Older'];
  
  groups.forEach(group => {
    expect(screen.getByText(group)).toBeInTheDocument();
    // Ensure emails are not displayed initially
    const groupEmails = screen.queryAllByText(group);
    expect(groupEmails.length).toBe(1); // Only the group name should be displayed
  });
});
 
test('renders the correct icon based on the display state', () => {
  render(<MailContent />);
  
  // Initially, the group should be collapsed, so ArrowRightIcon should be visible
  expect(screen.getAllByTestId('ArrowRightIcon').length).toBeGreaterThan(0);
  // expect(screen.queryByTestId('ArrowDropDownIcon')).not.toBeInTheDocument();

  // Simulate clicking to expand the group
  // fireEvent.click(screen.getByText('Older')); // replace 'Today' with the actual group name used in your component

  // After clicking, the group should be expanded, so ArrowDropDownIcon should be visible
  // expect(screen.queryByTestId('ArrowDropDownIcon')).toBeInTheDocument();
  // expect(screen.queryByTestId('ArrowRightIcon')).not.toBeInTheDocument();

    screen.getAllByTestId('ArrowRightIcon').forEach(icon => {
      expect(icon).toBeInTheDocument();
    });
      // Simulate clicking to expand the first group (replace 'Today' with the actual group name used in your component)
    fireEvent.click(screen.getByText('Older')); // Assuming 'Today' is a group that can be expanded
  
  // After clicking, the group should be expanded, so ArrowDropDownIcon should be visible
    expect(screen.getAllByTestId('ArrowDropDownIcon').length).toBeGreaterThan(0);
    screen.getAllByTestId('ArrowDropDownIcon').forEach(icon => {
      expect(icon).toBeInTheDocument();
    });

  // ArrowRightIcon should not be visible for the expanded group
  // screen.getAllByTestId('ArrowRightIcon').forEach(icon => {
  //   expect(icon).not.toBeInTheDocument();
  // });
});

const testEmails = [
  {
    time: '2024-07-24T10:46:57.000Z', // Example ISO date string
    // other properties...
  },
];
test('renders the correct icon based on the display state', () => {
  render(<MailContent/>);
  
  // Simulate clicking to expand the group
  fireEvent.click(screen.getByText('Today')); // Replace 'Today' with the actual group name

  // Format the date manually to match what the component would format
  const date = parseISO(testEmails[0].time);
  const formattedTime = format(date, 'HH:mm'); // Adjust the format as needed

  // Check if the formatted time is displayed in the document
  expect(screen.getByText(formattedTime)).toBeInTheDocument();
});
