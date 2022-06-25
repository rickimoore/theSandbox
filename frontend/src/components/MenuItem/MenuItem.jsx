import React from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';

const MenuItem = ({text, href}) => {
    const renderContent = () => {
        return (
            <a href={href} className="p-2 border hover:bg-slate-100 rounded mr-2 cursor-pointer">
                {text}
            </a>
        )
    }
  return href ? (
      <Link passHref href={href}>
          {renderContent()}
      </Link>
  ) : renderContent()
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
}

export default MenuItem;