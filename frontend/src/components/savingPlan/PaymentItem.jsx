import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Avator from '../Avator';
import ToggleSwitch from '../ToggleSwitch';

const PaymentItem = ({ payment, stats, onToggle, isActive }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition ${
        payment.last ? '' : 'border-b border-gray-200'
      }`}
    >
      <div className="flex items-center gap-4">
        <Avator fullname={payment.user.fullname} />
        <div>
          <p className="text-sm font-medium">{payment.user.fullname}</p>
          <p className="text-xs text-gray-500">
            <span className="font-bold mr-10">
              ${payment.amount} / {stats?.duration.split(' ')[1] || 'week'}
            </span>
            {payment.isPaid ? (
              <span className="text-green-500">Paid</span>
            ) : (
              <span className="text-orange-500">Pending</span>
            )}
          </p>
          <span className="text-xs">
            Due Date:{' '}
            <i className="text-xs text-red-500">
              {new Date(payment.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </i>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {payment.isPaid ? (
          <FaCheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <FaExclamationCircle className="text-orange-500 w-5 h-5" />
        )}
        <ToggleSwitch
          onToggle={() => onToggle(payment._id)}
          disabled={payment.isPaid}
          active={isActive}
        />
      </div>
    </div>
  );
};

export default PaymentItem;
