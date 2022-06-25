import {useQuery} from "@apollo/client";
import {GET_GREETINGS} from "../../apollo/queries/greetings";
import {useEffect, useState} from "react";

const useGreetingQuery = () => {
    const [data, setData] = useState([]);
    const { error, refetch } = useQuery(
        GET_GREETINGS,
            {
                skip: true,
            },
    );

    useEffect(() => {
        if(error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        (async () => {
            const {data} = await refetch();
            if(data) {
                setData(data?.greetings)
            }
        })()
    }, [])

    return {
        data: data.length ? data[0] : undefined,
    };
}

export default useGreetingQuery;