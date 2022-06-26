import {
  BidBlockAuction,
  BlockAwarded,
  BlockRedeemable,
  BlockRedeemed,
  ClaimBlockAuction,
  CreateBlockAuction,
  Transfer
} from "../generated/BlockAuction/BlockAuction"
import {Bid, BlockAuction, BlockNft} from "../generated/schema";
import {getOrCreateAccount} from "./utils";

export function handleBidBlockAuction(event: BidBlockAuction): void {
  let bid = new Bid(
      event.params.auctionId.toHex() + '-' + event.params.bidder.toHex() + '-' + event.block.timestamp.toString()
  );

  bid.from = getOrCreateAccount(event.params.bidder.toHex()).id;
  bid.amount = event.params.bid;
  bid.txHashCreated = event.transaction.hash;
  bid.auction = event.params.auctionId.toHex();
  bid.timestamp = event.block.timestamp;
  bid.save();

  let auction = BlockAuction.load(event.params.auctionId.toHex()) as BlockAuction;

  if(auction) {
    auction.highestBid = event.params.bid;
    auction.highestBidder = event.params.bidder;
    auction.save();
  }
}

export function handleBlockAwarded(event: BlockAwarded): void {
  let block = new BlockNft(event.params.tokenId.toHex());
  block.owner = getOrCreateAccount(event.params.winner.toHex()).id;
  block.timestamp = event.block.timestamp;
  block.save();
}

export function handleBlockRedeemable(event: BlockRedeemable): void {
  let auction = BlockAuction.load(event.params.auctionId.toHex()) as BlockAuction;
  auction.isRedeemable = true;
  auction.save();
}

export function handleBlockRedeemed(event: BlockRedeemed): void {
  let auction = BlockAuction.load(event.params.auctionId.toHex()) as BlockAuction;
  auction.isRedeemable = false;
  auction.isRedeemed = true;
  auction.save();
}

export function handleClaimBlockAuction(event: ClaimBlockAuction): void {
  let auction = BlockAuction.load(event.params.auctionId.toHex()) as BlockAuction;
  auction.isClaimed = true;
  auction.save();
}

export function handleCreateBlockAuction(event: CreateBlockAuction): void {
  let params = event.params.blockAuction;
  let auction = new BlockAuction(event.params.auctionId.toHex());
  auction.startTime = params.startTime;
  auction.endTime = params.endTime;
  auction.isClaimed = false;
  auction.isRedeemable = false;
  auction.isRedeemed = false;
  auction.minBid = params.minBid;
  auction.createdAt = event.block.timestamp;
  auction.minHigherBid = params.minHigherBid;
  auction.save();
}

export function handleTransfer(event: Transfer): void {
  // let block = BlockNft.load(event.params.tokenId.toHex()) as BlockNft;
  // if(block) {
  //   block.owner = getOrCreateAccount(event.params.to.toHex()).id;
  //   block.save();
  // }
}
