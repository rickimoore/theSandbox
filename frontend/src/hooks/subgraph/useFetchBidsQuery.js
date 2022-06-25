import {useQuery} from '@apollo/client';
import {BID_PAGE_SIZE} from '../../../constants';
import {GET_AUCTION_BIDS} from '../../apollo/queries/getBids';
import {useEffect, useState} from 'react';

const useFetchBidsQuery = (id) => {
  const [page, setPage] = useState(0);
  const [bids, setBids] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { refetch, loading } = useQuery(
      GET_AUCTION_BIDS,
      {
        variables: {
          id,
          skip: page * BID_PAGE_SIZE,
          first: BID_PAGE_SIZE,
        },
        skip: true,
      },
  );

  const fetchData = async () => {
    const {data} = await refetch({
      id,
      skip: page * BID_PAGE_SIZE,
      first: BID_PAGE_SIZE,
    });

    if(data) {
      const newBids = data.bids;

      console.log(newBids.length, BID_PAGE_SIZE)
      setBids(prev => ([...prev, ...newBids]));
      setHasMore(newBids.length === BID_PAGE_SIZE);
    }
  }

  useEffect(() => {
    if(id) {
      fetchData();
    }
    // startPolling(4000);
    // return () => {
    //   stopPolling();
    // };
  }, [id]);

  const loadMore = () => {
    console.log('loading more...')
  }

  return {
    bids,
    hasMore,
    isLoading: loading,
    loadMore,
  }
}

export default useFetchBidsQuery;