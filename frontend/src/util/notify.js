import toast from 'react-hot-toast';

export const notify = (response) => {
  if (!response.payload) return;
  const msg = response.payload.message;
  if (response.status === 0) toast.error(msg);
  else toast.success(msg);
};
