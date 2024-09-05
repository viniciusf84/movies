import React from 'react';
import Icon from '../Icon';
import { Link } from 'react-router-dom';

function ValidateIcon(props) {
  const { text, icon, link, disabled } = props;

  return (
    <div className="bottom">
      <button
        className={link ? 'btn btn-primary' : 'btn btn-primary no-link'}
        disabled={disabled}
      >
        {link && (
          <Link to={link}>
            <span>{text}</span>
            <Icon icon={icon} />
          </Link>
        )}
        {!link && (
          <>
            {text} <Icon icon={icon} />
          </>
        )}
      </button>
    </div>
  );
}

export default ValidateIcon;
