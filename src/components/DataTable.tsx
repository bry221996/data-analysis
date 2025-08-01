import {Record} from "@/model/Record";
import DataRow from "@/components/DataRow";
import {useMemo} from "react";

const DataTable = ({ records }: { records: Record[]}) => {
    const avgRoas = useMemo(() => {
        if (records.length < 3) return 0;

        const last3 = records.slice( -3); // newest first

        const totalSales = last3.reduce((sum, r) => sum + (r.sales as number), 0);
        const totalSpent = last3.reduce((sum, r) => sum + (r.amountSpent as number), 0);
        return totalSpent > 0 ? +(totalSales / totalSpent).toFixed(2) : 0;
    }, [records]);

    const note = useMemo(() => {
        if (records.length < 3) return "insufficient data";

        const last3 = records.slice(-3);
        const [d1, d2, d3] = last3.map(r => r.amountSpent ? (r.sales as number) / (r.amountSpent as number) : 0);

        const isUptrend = d3 >= d2 && d2 >= d1;
        const strongJump = Math.abs(((d2 as number) - (d3 as number))) > 2;

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
                records.length >=3 && <div className="border-t border-gray-300 py-2">

                    <div className="border border-gray-300 bg-gray-100 py-6 px-8 rounded-2xl text-center">
                        <p className="text-base text-gray-500">Last 3 Days ROAS</p>
                        <p className="text-4xl font-bold text-gray-800 mb-4">{avgRoas}</p>

                        <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide
                          ${note === 'scale' ? 'bg-green-200 text-green-800' : ''}
                          ${note === 'maintain' ? 'bg-yellow-200 text-yellow-800' : ''}
                          ${note === 'kill' ? 'bg-red-200 text-red-800' : ''}`}
                            >
                        {note}
                      </span>
                    </div>

                </div>
            }
        </div>
    </div>
}

export default DataTable