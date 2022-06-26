pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";


contract BlockAuction is ReentrancyGuard, ERC721URIStorage {
    event CreateBlockAuction(Auction blockAuction, uint256 auctionId);
    event BidBlockAuction(uint256 auctionId, address bidder, uint256 bid);
    event ClaimBlockAuction(uint256 auctionId);
    event BlockAwarded(address winner, uint tokenId);
    event BlockRedeemable(uint256 auctionId);
    event BlockRedeemed(uint256 auctionId);

    error MaxAuctionLimit();
    error InvalidStartOrEndTime();
    error AuctionNotActive();
    error BidNotSufficient();
    error HasTopBid();
    error ReturnFundsFailed();
    error AuctionNotEnded();
    error AuctionClaimedAlready();
    error ClaimAuctionFailed();
    error BlockNotRedeemable();
    error InsufficientRedeemAmount();

    address payable public beneficiary;
    uint maxAuctions;
    uint public redeemPoolAmount;
    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;
    Counters.Counter private _tokenIds;


    struct Auction {
        address payable highestBidder;
        uint256 highestBid;
        uint16 minHigherBid;
        uint256 minBid;
        uint40 startTime;
        uint40 endTime;
        bool isClaimed;
        bool isRedeemable;
        bool isRedeemed;
    }


    struct AuctionParams {
        uint256 minBid;
        uint16 minHigherBid;
        uint40 startTime;
        uint40 endTime;
    }

    mapping(uint256 => Auction) public auctions;

    constructor(
        address payable beneficiaryAddress
    ) ERC721("100Blocks", "100BCK") {
        beneficiary = beneficiaryAddress;
        maxAuctions = 100;
    }

    modifier onlyOwner {
        require(msg.sender == beneficiary, 'Not authorized');
        _;
    }

    modifier auctionExists(uint256 auctionId) {
        require(auctions[auctionId].startTime != 0, 'Auction does not exist');
        _;
    }

    function bidBlockAuction (uint256 auctionId) external payable auctionExists(auctionId) {
        Auction storage auction = auctions[auctionId];

        if (block.timestamp < auction.startTime || block.timestamp > auction.endTime) {
            revert AuctionNotActive();
        }

        if(msg.sender == auction.highestBidder) {
            revert HasTopBid();
        }

        if(msg.value < auction.minBid || msg.value == 0) {
            revert BidNotSufficient();
        }

        if(auction.highestBidder != address(0)) {
            if(msg.value < ((auction.highestBid * auction.minHigherBid / 10_000) + auction.highestBid)) {
                revert BidNotSufficient();
            }

            if(!auction.highestBidder.send(auction.highestBid)) {
                revert ReturnFundsFailed();
            }
        }

        auction.highestBidder = payable(msg.sender);
        auction.highestBid = msg.value;

        emit BidBlockAuction(auctionId, msg.sender, msg.value);
    }

    function startBlockAuction (AuctionParams calldata params) external onlyOwner {
        _auctionIds.increment();
        uint256 newAuction = _auctionIds.current();
        Auction storage auction = auctions[newAuction];

        if(newAuction >= maxAuctions) {
            revert MaxAuctionLimit();
        }

        if (params.endTime <= block.timestamp || params.endTime <= params.startTime) {
            revert InvalidStartOrEndTime();
        }

        auction.endTime = params.endTime;
        auction.startTime = params.startTime;
        auction.minBid = params.minBid;
        auction.minHigherBid = params.minHigherBid;
        auction.isClaimed = false;
        auction.isRedeemable = false;
        auction.isRedeemed = false;

        emit CreateBlockAuction(auction, newAuction);
    }

    function claimAuction(uint256 auctionId) external onlyOwner auctionExists(auctionId) {
        Auction storage auction = auctions[auctionId];
        if(block.timestamp <= auction.endTime) {
            revert AuctionNotEnded();
        }

        if(auction.isClaimed) {
            revert AuctionClaimedAlready();
        }

        auction.isClaimed = true;

        emit ClaimBlockAuction(auctionId);

        if(auction.highestBid != 0) {

            if(!beneficiary.send(auction.highestBid)) {
                revert ClaimAuctionFailed();
            }

            awardBlock(auction.highestBidder);

        } else {
            auction.isRedeemable = true;
            emit BlockRedeemable(auctionId);
        }
    }

    function redeemBlock(uint256 auctionId) external payable auctionExists(auctionId) {
        Auction storage auction = auctions[auctionId];
        if(!auction.isRedeemable || auction.isRedeemed) {
            revert BlockNotRedeemable();
        }

        if(msg.value <= 0) {
            revert InsufficientRedeemAmount();
        }

        redeemPoolAmount += msg.value;
        auction.isRedeemed = true;

        awardBlock(msg.sender);

        emit BlockRedeemed(auctionId);
    }

    function awardBlock(address winner) internal {
        _tokenIds.increment();

        uint256 newToken = _tokenIds.current();
        _mint(winner, newToken);
        _setTokenURI(newToken, 'https://ipfs.io/ipfs/bafkreif5uxbnct4dem7rh6mduf6ja65o4kuueyrfix5rjtrgjulh4c2oky');

        emit BlockAwarded(winner, newToken);
    }
}