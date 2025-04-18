import PaymentItem from './PaymentItem';

const PaymentList = ({ payments, stats, switchStates, onToggle }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    {payments.map((payment, idx) => (
      <PaymentItem
        key={payment._id}
        payment={{ ...payment, last: idx === payments.length - 1 }}
        stats={stats}
        onToggle={onToggle}
        isActive={switchStates[payment._id]}
      />
    ))}
  </div>
);

export default PaymentList;
