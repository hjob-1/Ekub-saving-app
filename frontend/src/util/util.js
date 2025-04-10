export const formateSavingPlan = (savingPlan) => {
  const participantIds = savingPlan.participants.map((user) => user._id);
  return {
    ...savingPlan,
    participants: participantIds,
  };
};
