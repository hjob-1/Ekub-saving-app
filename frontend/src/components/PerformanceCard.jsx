export default function PerformanceCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-purple-100 p-4 rounded-xl shadow-sm text-center w-full">
      <div className="text-purple-700 mb-2 text-3xl">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}
