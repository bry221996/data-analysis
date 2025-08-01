import {Record} from "@/model/Record";
import DataRow from "@/components/DataRow";
import {useEffect, useMemo} from "react";

const DataTable = ({ records }: { records: Record[]}) => {
    const avgRoas = useMemo(() => {
        if (records.length < 3) return 0;

        const last3 = records.slice(0, 3); // newest first

        const totalSales = last3.reduce((sum, r) => sum + r.amountSpent * r.roas, 0);
        const totalSpent = last3.reduce((sum, r) => sum + r.amountSpent, 0);

        return totalSpent > 0 ? +(totalSales / totalSpent).toFixed(2) : 0;
    }, [records]);

    const note = useMemo(() => {
        if (records.length < 3) return "insufficient data";

        const last3 = records.slice(0, 3);
        const [d1, d2, d3] = last3.map(r => r.roas);

        const isUptrend = d3 >= d2 && d2 >= d1;
        const strongJump = (d2 - d3) > 2;

        // console.log('isUptrend', isUptrend);
        // console.log('strongJump', strongJump);

        if (avgRoas >= 6) {
            return isUptrend || !strongJump ? "scale" : "maintain";
        } else if (avgRoas >= 3) {
            return "maintain";
        } else {
            return "kill";
        }
    }, [records, avgRoas]);


    return <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
            <table className="relative min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                        Day
                    </th>
                    <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                        Amount Spent
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        ROAS
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        CTR
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        CPM
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Hook Rate
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Message Conversation Rate
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {records.map((record, index) => <DataRow day={index + 1} key={`record-day-${index}`} record={record}/>)}
                </tbody>
            </table>

            {
                records.length >=3 && <div className="bg-gray-100 py-5 px-5 rounded-2xl">
                    {avgRoas} - {note}
                </div>
            }
        </div>
    </div>
}

export default DataTable