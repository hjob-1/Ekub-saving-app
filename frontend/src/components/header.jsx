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
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonText}
          {buttonIcon ? (
            buttonIcon
          ) : (
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default PageHeader;
