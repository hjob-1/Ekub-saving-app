import { FiPlus } from 'react-icons/fi';

const PageHeader = ({
  title,
  subtitle,
  children,
  showActionButton = false,
  buttonText = 'Action',
  onButtonClick,
  buttonIcon,
}) => {
  return (
    <div className="flex flex-col mt-6 sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      {children ? (
        <div className="mt-4 sm:mt-0">{children}</div>
      ) : showActionButton ? (
        <button
          onClick={onButtonClick}
          className="mt-4 sm:m-0 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
        >
          {buttonIcon ? buttonIcon : <FiPlus />}
          {buttonText}
        </button>
      ) : null}
    </div>
  );
};

export default PageHeader;
