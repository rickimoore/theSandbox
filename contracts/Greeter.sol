pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Greeter is ERC721URIStorage {
   event MessengerAwarded(address messenger, uint tokenId);
   event GreetingSet(address messenger, string message);


   string private greeting;
   uint maxChar;
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor () ERC721("HelloWorld", "HMW") {
      greeting = 'Hello World!';
      maxChar = 280;
   }

   function greet() public view returns(string memory) {
      return greeting;
   }

   function setGreeter(string calldata message) external {
      uint charCount = bytes(message).length;
      require(charCount <= maxChar, 'Exceeded max char limit');
      greeting = message;

      emit GreetingSet(msg.sender, message);

      if(balanceOf(msg.sender) == 0) {
         awardMessenger(msg.sender, 'https://ipfs.io/ipfs/bafkreif5uxbnct4dem7rh6mduf6ja65o4kuueyrfix5rjtrgjulh4c2oky');
      }
   }

   function awardMessenger(address messenger, string memory tokenURI) internal returns (uint256) {
      _tokenIds.increment();

      uint256 newToken = _tokenIds.current();
      _mint(messenger, newToken);
      _setTokenURI(newToken, tokenURI);

      emit MessengerAwarded(messenger, newToken);

      return newToken;
   }
}