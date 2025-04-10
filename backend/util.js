const getEndDate = (startDate, paymentPlan, noOfParticipants) => {
  const start = new Date(startDate);
  let endDate = new Date(start);

  switch (paymentPlan) {
    case 'weekly':
      endDate.setDate(start.getDate() + 7 * noOfParticipants);
      break;
    case 'biweekly':
      endDate.setDate(start.getDate() + 14 * noOfParticipants);
      break;
    case 'monthly':
      endDate.setMonth(start.getMonth() + noOfParticipants);
      break;
    default:
      throw new Error('Invalid payment plan');
  }

  return endDate;
};

module.exports = {
  getEndDate,
};
