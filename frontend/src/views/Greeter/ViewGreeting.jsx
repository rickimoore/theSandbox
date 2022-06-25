import React, {useState} from "react";
import PropTypes from "prop-types";
import useGreetingQuery from "../../hooks/subgraph/useGreetingQuery";
import GreetMessage from "../../components/GreetMessage/GreetMessage";
import MessageHistory from "../../components/MessageHistory/MessageHistory";
import useChainConnection from "../../hooks/useChainConnection";

const ViewGreeting = ({onChangeView}) => {
    const {active, isValidChain} = useChainConnection();
    const {data} = useGreetingQuery();
    const [isViewAll, setIsViewAll] = useState(false);

    const viewHistory = () => setIsViewAll(true);

    return (
        <div className="w-full flex flex-col items-center px-6">
            <GreetMessage onClick={onChangeView} greeting={data} activeCta={active && isValidChain} hasCta />
            {
                isViewAll ? (
                    <MessageHistory/>
                ) : (
                    <div className="w-full flex pt-8 justify-center">
                        <div className="bg-white p-2 rounded flex space-x-2 items-center">
                            <i className="text-gray-400 bi bi-arrow-clockwise"/>
                            <p onClick={viewHistory} className="text-gray-400 text-xs cursor-pointer">View History</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

ViewGreeting.propTypes = {
    onChangeView: PropTypes.func.isRequired
}

export default ViewGreeting;