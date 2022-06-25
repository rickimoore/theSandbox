import PropTypes from 'prop-types';

export const Auction = {
  createdAt: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  minBid: PropTypes.string,
  highestBid: PropTypes.string,
  id: PropTypes.string.isRequired,
  isClaimed: PropTypes.bool.isRequired,
  isRedeemable: PropTypes.bool.isRequired,
  isRedeemed: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
}