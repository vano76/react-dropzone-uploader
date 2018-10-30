import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const SubmitButton = (props) => {
  const {
    onSubmit,
    files,
    className = 'dzu-submitButtonContainer',
    buttonClassName = 'dzu-submitButton',
    text = 'Submit',
    disabled,
  } = props

  if (!onSubmit || files.length === 0) return null

  const _disabled =
    files.some(f => f.meta.status === 'uploading' || f.meta.status === 'preparing') ||
    !files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }

  return (
    <div className={className}>
      <button
        className={buttonClassName}
        onClick={handleSubmit}
        disabled={disabled || _disabled}
      >
        {text}
      </button>
    </div>
  )
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  files: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default SubmitButton
