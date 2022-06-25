import React from "react";
import GreetMessage from "../GreetMessage/GreetMessage";
import InfiniteScroll from "react-infinite-scroller";
import useMessageHistoryQuery from "../../hooks/subgraph/useMessageHistoryQuery";

const MessageHistory = () => {
  const {data, loading, hasMore, loadMore} = useMessageHistoryQuery();

  return (
          <InfiniteScroll initialLoad={false} loadMore={loadMore} hasMore={!loading && hasMore}>
              <div className="w-screen flex flex-col items-center px-6 py-14">
              {
                  Boolean(data?.length) && data.map((message, index) => (
                      <GreetMessage className="mb-4" key={index}  greeting={message} />
                  ))
              }
              </div>
          </InfiniteScroll>
  )
}

export default MessageHistory;