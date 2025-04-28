import { useState } from 'react';
import { FiSend, FiCheck } from 'react-icons/fi';

const EmailReminderButton = ({ dueDate, onSendEmail }) => {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await onSendEmail(dueDate); // Your email sending function
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSendEmail}
      disabled={isLoading || isSent}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isSent
          ? 'bg-green-100 text-green-700 cursor-default'
          : isLoading
          ? 'bg-blue-100 text-blue-700 cursor-wait'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Sending...</span>
        </>
      ) : isSent ? (
        <>
          <FiCheck className="text-lg" />
          <span>Email Sent</span>
        </>
      ) : (
        <>
          <FiSend className="text-lg" />
          <span>Send Reminder</span>
        </>
      )}
    </button>
  );
};
export default EmailReminderButton;

// Usage in your admin component:
// <EmailReminderButton
//   dueDate="2023-12-31"
//   onSendEmail={(date) => yourEmailSendingFunction(date)}
// />
