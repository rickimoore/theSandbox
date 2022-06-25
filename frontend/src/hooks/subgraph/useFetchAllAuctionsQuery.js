import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_ALL_AUCTIONS} from '../../apollo/queries/getAllAuctions';
import {AUCTION_PAGE_SIZE} from '../../../constants';

const useFetchAllAuctionsQuery = () => {
  const [page, setPage] = useState(0);
  const [auctions, setAuctions] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading, refetch } = useQuery(
      GET_ALL_AUCTIONS,
      {
        variables: {
          skip: page * AUCTION_PAGE_SIZE,
          first: AUCTION_PAGE_SIZE,
        },
        skip: true,
      },
  );

  useEffect(() => {
    (async () => {
      const {data} = await refetch();
      const auctions = data?.blockAuctions;
      if(auctions) {
        setAuctions((prev = []) => ([...prev, ...auctions]));
        if(auctions.length < AUCTION_PAGE_SIZE) {
          setHasMore(false);
        }
      }
    })()
  }, [page]);

  const loadMore = (page) => {
    if(!hasMore) return;
    setPage(page);
  };

  return {
    auctions,
    loadMore,
    loading,
    hasMore,
  }
}

export default useFetchAllAuctionsQuery;