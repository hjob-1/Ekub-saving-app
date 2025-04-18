import { Fragment } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router'; // or your routing solution

const Breadcrumb = ({ items = [], separator = null, className = '' }) => {
  if (items.length === 0) return null;

  return (
    <nav
      className={`flex items-center text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 md:space-x-4">
        {items.map((item, index) => (
          <Fragment key={index}>
            {/* Display home Icon on the first item */}
            {index == 0 && (
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            )}
            {/* Icon  */}
            {index > 0 && (
              <li className="flex items-center">
                {separator || (
                  <FaChevronRight
                    className="h-4 w-4 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </li>
            )}
            <li className="flex items-center">
              {index === items.length - 1 ? (
                <span
                  className="text-gray-500 font-medium truncate max-w-[120px] md:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-indigo-600 hover:text-indigo-800 truncate max-w-[120px] md:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
