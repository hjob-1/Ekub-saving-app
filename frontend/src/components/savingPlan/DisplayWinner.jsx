import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaCopy, FaCheck } from 'react-icons/fa';

const WinnerDisplay = ({ winner }) => {
  const [copied, setCopied] = useState(false);
  const handleCall = () => {
    window.open(`tel:${winner.phone}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(winner.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="mt-4 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200 shadow-sm">
        <div className="flex items-center">
          {/* Celebration icon */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="mr-3"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          </motion.div>

          {/* Winner info */}
          <div className="flex-1">
            <h3 className="font-bold text-green-700">Winner Selected!</h3>
            <div className="mt-1">
              <p className="font-medium text-gray-800">{winner.fullname}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600 mr-2">
                  📞 {winner.phone}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Copy phone number"
                >
                  {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                </button>
              </div>
            </div>
          </div>

          {/* Call button */}
          <button
            onClick={handleCall}
            className="ml-2 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <FaPhone className="mr-1" />
            Call
          </button>
        </div>

        {/* Notification badge */}
        <div className="mt-2 flex items-center justify-end">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg
              className="mr-1 h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            Participants notified via Email
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WinnerDisplay;
