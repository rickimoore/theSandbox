import {useQuery} from "@apollo/client";
import {GET_ALL_MESSAGE_HISTORY} from "../../apollo/queries/allMessageHistory";
import {GREETING_PAGE_SIZE} from "../../../constants";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const useMessageHistoryQuery = () => {
    const [page, setPage] = useState(0);
    const [messages, setMessages] = useState();
    const [hasMore, setHasMore] = useState(true);
    const { loading, refetch } = useQuery(
        GET_ALL_MESSAGE_HISTORY,
        {
            variables: {
                skip: (page * GREETING_PAGE_SIZE) + 1,
                first: GREETING_PAGE_SIZE,
            },
            skip: true,
        },
    );

    useEffect(() => {
        (async () => {
            const {data} = await refetch();
            const greetings = data?.greetings;
            if(greetings) {
                setMessages((prevMessages = []) => ([...prevMessages, ...greetings]));
                if(greetings.length < GREETING_PAGE_SIZE) {
                    setHasMore(false);
                }
            }
        })()
    }, [page])

    const loadMore = (page) => {
        if(!hasMore) return;
        setPage(page);
    };


    return {
        data: messages,
        refetch,
        loadMore,
        hasMore,
        loading,
    }
}

useMessageHistoryQuery.propTypes = {
    page: PropTypes.number.isRequired
}

export default useMessageHistoryQuery;