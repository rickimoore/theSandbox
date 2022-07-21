import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";
import Link from 'next/link';

const Button = ({onClick, className, children, isDisabled, isLoading, href}) => {
    const renderBtn = () => (
        <button
            className={`disabled:opacity-50 min-w-100 disabled:pointer-events-none w-full cursor-pointer p-2 bg-midnight hover:bg-midnightMedium text-white ${className}`}
            disabled={isDisabled || isLoading} onClick={onClick}>
            {
                isLoading ? <BeatLoader color="#ffffff"/> : children
            }
        </button>
    )

  return href ? (
      <Link href={href}>
          <a>
              {renderBtn()}
          </a>
      </Link>
  ) : renderBtn();
}

Button.propTypes = {
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    onClick: PropTypes.func
}

export default Button;