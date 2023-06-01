import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const ThWIthToolTip = ({
    columnHeader,
    cId,
}: {
    columnHeader: string;
    cId: number;
}) => {
    const [columnToolTip, setColumnToolTip] = useState({
        show: false,
        columnId: -1,
        columnData: "",
    });

    const showToolTip = (columnDataId: number) => {
        const columnData = [
            "The campaign objective is what your campaign aims to achieve.", // campaign objective
            "The total amount of money you are  spent on your ad campaign.", // budget
            "The estimated total amount of money you've spent on your campaign until now.", // amount spent
            "Targeted gender based on your entry data", // target gender
            "Targeted countries based on your entry data", // target countries
            "The number of times your ad achieved an outcome, based on the objective and settings you selected", // results
            "The average cost per result from your ads.", // cost per result
            "The average number of times an ad is shown to a unique individual within a specific time period.", // frequency
            "Reach is the total number of people who saw your ad at least once.", // reach
            "The number of times your ads were on screen.", // impressions
            "The average cost for each link click.", // cpc
            "The average cost for 1,000 impressions.", // cpm
            "The percentage of times people saw your ad and performed a link click.", // ctr
            "The number of clicks on links within the ad that led to advertiser-specified destinations.", // link clicks
            "Generated assessment with ai based on the given campaign data", // campaign assessment
            "Action that you can take against your campaigns, including 🪲 problems in your ad and 🛡️ how to optimize your ad", // actions
        ];

        setColumnToolTip({
            show: true,
            columnId: columnDataId,
            columnData: columnData[columnDataId],
        });
    };

    return (
        <th className="th">
            <span
                className="has-tooltip cursor-default"
                onMouseOver={() => showToolTip(cId)}
            >
                <span className="tooltip w-full max-w-[220px] text-left shadow-lg shadow-secondary-background border bg-alt-background border-[#5d5d5d] p-3 rounded-md ml-6 mt-6">
                    <p className="text-typography-body-dark text-xs">
                        {columnHeader}
                    </p>

                    {columnToolTip.show && columnToolTip.columnId === cId ? (
                        <p className="text-slate-200 font-normal text-[11px] pt-3">
                            {columnToolTip.columnData}
                        </p>
                    ) : (
                        <BiLoaderAlt
                            className="animate-spin flex justify-center w-full mt-2"
                            size={20}
                        />
                    )}
                </span>
                {columnHeader}
            </span>
        </th>
    );
};

export default ThWIthToolTip;
