import { GiPayMoney } from 'react-icons/gi';
const Logo = () => {
  return (
    <>
      <div className="flex flex items-center justify-center gap-3 font-mono">
        <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 text-indigo-600">
          equb
        </h2>
        <GiPayMoney className="text-4xl text-indigo-600 " />
      </div>
      <h4 className="font-mono text-1xl text-indigo-600 mb-5">
        save for tomorrow
      </h4>
    </>
  );
};

export default Logo;
