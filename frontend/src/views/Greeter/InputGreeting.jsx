import React, {useState} from "react";
import useGreeterContract from "../../hooks/useGreeterContract";
import Button from "../../components/Button/Button";
import PropTypes from "prop-types";
import {GREETER_CHAR_LIMIT, GREETING_INPUT_VIEW} from "../../../constants";
import useGreetingGasEstimation from "../../hooks/useGreetingGasEstimation";
import Player from 'lottie-react';
import PendingAnim from '../../assets/pending.json';

const InputGreeting = ({onChangeView, onBack}) => {
    const instance = useGreeterContract();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [view, setView] = useState(GREETING_INPUT_VIEW.FORM_FILL);
    const options = {
        loop: true,
        autoplay: true,
        animationData: PendingAnim,
    };

    const {gasFee, usdAmount} = useGreetingGasEstimation(message);

    const hasExceededLimit = message.length > GREETER_CHAR_LIMIT;
    const excessAmount = hasExceededLimit && GREETER_CHAR_LIMIT - message.length;
    const isValidMessage = message && !hasExceededLimit;

    const removeErrorMessage = () => setError('');

    const handleError = (e) => {
        setLoading(false);
        if(e.code === 4001) {
            setError('User rejected transaction signature.');
            return;
        }
        if(e.code === 'NONCE_EXPIRED') {
            setError('User nonce too low.');
            return;
        }

        setError('Unknown error occurred. Please try again.')
    }
    const saveGreeting = async () => {
        setLoading(true);
        setError('');
        const tx = await instance?.setGreeter(message)
            .catch(handleError);

        if(!tx) return;

        setView(GREETING_INPUT_VIEW.PENDING);

        console.log(tx)

        const res = await tx.wait();

        if(!res) return;

        console.log(res, 'response');
        
        setLoading(false);
        onChangeView();
    }
  return (
      <div className="w-full px-4 items-center flex flex-col">
          <div className="w-full max-w-xl">
              {
                  error && (
                      <div className="w-full relative bg-red-200 rounded mb-6 p-4 flex space-x-4">
                          <i onClick={removeErrorMessage} className="absolute top-3 right-3 cursor-pointer bi bi-x-circle"/>
                          <i className="text-red-600 bi bi-exclamation-octagon"/>
                          <p className="text-red-600">{error}</p>
                      </div>
                  )
              }
              {
                  view === GREETING_INPUT_VIEW.FORM_FILL && (
                  <>
                      <div className="w-full flex flex-col bg-white rounded p-6">
                          <div className="mb-6">
                  <textarea autoFocus placeholder="Say something..." rows={4} id="greeting" className="w-full border-none outline-none bg-slate-100 rounded-lg p-2" type="text" value={message}
                            onChange={(e) => setMessage(e.target.value)}/>
                              {hasExceededLimit && (
                                  <p className="text-xs text-red-600">Character limit reached: {excessAmount}</p>
                              )}
                          </div>
                          <div className="w-full flex justify-end">
                              <div className="flex items-center space-x-2">
                                  <div className="flex space-x-2">
                                      {
                                          isValidMessage && gasFee && (
                                              <p className="text-xs text-gray-500">{`~ ${gasFee.toFixed(5)} MATIC`}</p>
                                          )
                                      }
                                      {
                                          isValidMessage && usdAmount && (
                                              <p className="text-xs font-bold">{`$${usdAmount.toFixed(5)} USD`}</p>
                                          )
                                      }
                                  </div>
                                  <Button
                                      className="bg-cyan-800"
                                      isLoading={isLoading}
                                      isDisabled={!isValidMessage}
                                      onClick={saveGreeting}>
                                      <p>Save Message</p>
                                  </Button>
                              </div>
                          </div>
                      </div>
                      <div className="w-full flex justify-center">
                          <p onClick={onBack} className="mt-4 text-sm text-blue-500 cursor-pointer">Nevermind</p>
                      </div>
                  </>
                  )
              }
              {
               view === GREETING_INPUT_VIEW.PENDING && (
                   <div className="flex flex-col items-center">
                       <Player
                           className="wrapper__animation"
                           {...options}
                       />
                       <p className="text-lg font-bold">Transaction Pending</p>
                       <p className="text-xs">This may take a few moments...</p>
                   </div>
               )
              }
          </div>
      </div>
  )
}

InputGreeting.propTypes = {
    onBack: PropTypes.func.isRequired,
    onChangeView: PropTypes.func.isRequired
}

export default InputGreeting;