import React from 'react';
import EmailReminderButton from './EmailReminderButton';
const defaultTabs = [
  { key: 'payment', label: 'Payment List' },
  { key: 'winners', label: 'Winners' },
  { key: 'all', label: 'All' },
];
export default function TabPanel({ tabs = defaultTabs, tab, setTab }) {
  return (
    <div className="flex gap-4 mb-6 pb-2">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className={`pb-2 ${
            tab === key
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-500'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
