import TransactionStateScreen from '../../components/Transaction/TransactionStateScreen';
import Button from '../../components/Button/Button';
import React from 'react';
import {DatePicker} from 'antd';
import CreateAuctionForm from '../../forms/CreateAuctionForm';
import {Controller} from 'react-hook-form';
import moment from 'moment';
import InputField from '../../components/Input/InputField';

const CreateAuction = () => {
  const {RangePicker} = DatePicker;

  return (
      <CreateAuctionForm>
        {({control, outBidAmount, txHash, isCompleteTx, isLoading, onSubmit, isDisabled}) => txHash ? (
            <TransactionStateScreen isComplete={isCompleteTx} txHash={txHash} redirectCta="View Auctions" redirectDestination="/auctions"/>
        ) : (
            <div className="max-w-xl w-full bg-white p-4 rounded">
              <h2>Create a new auction</h2>
              <div className="mt-8 space-y-6">
                <div className="relative">
                  <p className="text-xs mb-2">Start - End Dates</p>
                  <Controller
                      name="startEndTime"
                      control={control}
                      render={({
                                 field: { onChange },
                                 fieldState: { _error },
                               }) => (
                          <RangePicker
                              disabledDate={date => moment(date).isBefore(moment.now())}
                              onChange={onChange}
                              format="YYYY-MM-DD HH:mm"
                              showTime={{ format: 'HH:mm' }}
                          />
                      )}
                  />
                </div>
                <div>
                  <Controller
                      name="minBid"
                      control={control}
                      render={({
                                 field: { ref: _ref, ...rest },
                                 fieldState: { error },
                               }) => (
                          <InputField
                              label="Minimum Bid Amount"
                              type="number" error={error?.message}
                              min={0} addonAfter="ETH" {...rest} />
                      )}
                  />
                </div>
                <div>
                  <Controller
                      name="minHigherBid"
                      control={control}
                      render={({
                                 field: { ref: _ref, ...rest },
                                 fieldState: { error },
                               }) => (
                          <div className="flex space-x-4 items-end">
                            <InputField label="Minimum Higher Bid Percentage"
                                error={error?.message} type="number" min={0}
                                addonAfter="%" {...rest} />
                            <p className="m-0 text-xs">(${outBidAmount} ETH)</p>
                          </div>
                      )}
                  />
                </div>
              </div>
              <Button className="mt-12" isLoading={isLoading} isDisabled={isDisabled} onClick={onSubmit}>
                Create Auction
              </Button>
            </div>
        )}
      </CreateAuctionForm>
  );
}

export default CreateAuction;