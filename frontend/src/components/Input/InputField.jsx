import React from 'react';
import { Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

const InputField = (props) => {
  const { type, error, label, className, ...rest } = props;
  const renderInputType = () => {
    switch (type) {
      case 'number':
        return <InputNumber status={error && 'error'} {...rest}/>;
      default:
        return <Input status={error && 'error'} {...rest} />;
    }
  }
  return (
      <div className={`relative ${className}`}>
        {label && (
            <p className="mb-2 text-xs">{label}</p>
        )}
        {renderInputType()}
        {error && (
            <p className="text-red-500 mt-1 capitalize absolute left-0 top-full text-caption">{error}</p>
        )}
      </div>
  )
}

InputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
}

export default InputField;