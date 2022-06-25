import formatAddress from "../../utils/formatAddress";
import moment from "moment";
import Button from "../Button/Button";
import React from "react";
import PropTypes from "prop-types";

const GreetMessage = ({hasCta, activeCta, greeting, onClick, className}) => {
  return (
      <div className={`w-full max-w-xl bg-white p-4 rounded flex flex-col items-end ${className || ''}`}>
          <div className="w-full flex">
              <div className="mr-6">
                  <div className="bg-cyan-200 flex items-center justify-center rounded-full h-12 w-12">
                      <i className="bi text-2xl bi-chat-dots text-white"/>
                  </div>
              </div>
              <div>
                  {Boolean(greeting) && (
                      <div className="flex mb-2 items-center space-x-4">
                          <p className="font-bold">@{formatAddress(greeting.owner)}</p>
                          <p className="text-gray-400 text-xs">{moment((parseInt(greeting.timestamp) * 1000)).fromNow()}</p>
                      </div>
                  )}
                  <p className="mb-4 text-gray-500">
                      {greeting ? greeting.message : 'Be the first to leave a message!' }
                  </p>
              </div>
          </div>
          {
              hasCta && (
                  <Button className="bg-cyan-800 mt-6" isDisabled={!activeCta} onClick={onClick}>
                      {activeCta ? 'Say Something' : 'Connect to say something'}
                  </Button>
              )
          }
      </div>
  )
}

GreetMessage.propTypes = {
    hasCta: PropTypes.bool,
    activeCta: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    greeting: PropTypes.shape({
        message: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired
    })
}

export default GreetMessage;