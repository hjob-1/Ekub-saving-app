export const formateSavingPlan = (savingPlan) => {
  const participantIds = savingPlan.participants.map((user) => user._id);
  return {
    ...savingPlan,
    participants: participantIds,
  };
};

export const formateDate = (date) => {
  const dateString = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return dateString;
};
