const bgColors = [
  'bg-gradient-to-r from-purple-500 to-indigo-600',
  'bg-gradient-to-r from-rose-500 to-pink-600',
  'bg-gradient-to-r from-amber-500 to-orange-600',
  'bg-gradient-to-r from-emerald-500 to-teal-600',
  'bg-gradient-to-r from-blue-500 to-cyan-600',
];
const Avator = ({ fullname }) => {
  const index = fullname.charCodeAt(0) % bgColors.length;
  const initials = fullname
    .split(' ')
    .map((name) => name[0])
    .join('');
  return (
    <div
      className={`w-8 h-8 rounded-full object-cover ${bgColors[index]} flex items-center justify-center text-white `}
    >
      <span>{initials}</span>
    </div>
  );
};

export default Avator;
