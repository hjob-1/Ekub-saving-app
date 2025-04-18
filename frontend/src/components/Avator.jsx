const bgColors = [
  'bg-indigo-600',
  'bg-slate-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-pink-500',
  'bg-orange-500',
];
const Avator = ({ fullname }) => {
  const index = fullname.charCodeAt(0) % bgColors.length;
  const initials = fullname
    .split(' ')
    .map((name) => name[0])
    .join('');
  return (
    <div
      className={`w-10 h-10 rounded-full object-cover ${bgColors[index]} flex items-center justify-center text-white `}
    >
      <span>{initials}</span>
    </div>
  );
};

export default Avator;
