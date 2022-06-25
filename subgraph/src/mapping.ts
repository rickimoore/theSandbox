import {
  ApprovalForAll,
  GreetingSet,
  MessengerAwarded,
  Transfer
} from "../generated/Greeting/Greeting"
import { Greeting, Award } from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleGreetingSet(event: GreetingSet): void {
  let greeting = new Greeting(event.params.messenger.toHex() + '-' + event.transaction.hash.toHex());
  greeting.owner = event.params.messenger;
  greeting.message = event.params.message;
  greeting.timestamp = event.block.timestamp;
  greeting.save();
}

export function handleMessengerAwarded(event: MessengerAwarded): void {
  let award = new Award(event.transaction.hash.toHex());
  award.nft = event.params.tokenId.toHex();
  award.owner = event.params.messenger;
  award.timestamp = event.block.timestamp;
  award.save();
}

export function handleTransfer(event: Transfer): void {}
