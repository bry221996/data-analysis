import {Record} from "@/model/Record";
import {useMemo} from "react";

interface Note {
    status: boolean;
    note: string;
}

const DataRow = ({ day, record}: {day: number, record: Record}) => {
    const roas = useMemo(() => {
        return  (record.amountSpent as number) > 0 ? +((record.sales as number) / (record.amountSpent as number)).toFixed(2) : 0;
    }, [record.amountSpent, record.sales])

    const roasNote: Note = useMemo(() => {
        if (roas as number >= 6) {
            return { note: 'High ROAS', status: true }
        } else if ((roas as number) >= 3 && (roas as number) < 6) {
            return { note: 'Good ROAS', status: true }
        } else {
            return { note: 'Low ROAS', status: false }
        }
    }, [roas, record.amountSpent, record.sales])

    const ctrNote: Note = useMemo(() => {
        if (record.ctr as number >= 1.5) {
            return { note: 'High CTR', status: true }
        } else {
            return { note: 'Low CTR', status: false }
        }
    }, [record.ctr])

    const cpmNote: Note = useMemo(() => {
        if (record.cpm as number <= 15 && record.cpm as number > 0) {
            return { note: 'Good CPM', status: true }
        } else {
            return { note: 'Bad CPM', status: false }
        }
    }, [record.cpm])

    const hookRateNote: Note = useMemo(() => {
        if (record.hookRate as number >= 40) {
            return { note: 'Good Hook', status: true }
        } else {
            return { note: 'Need to improve Hook', status: false }
        }
    }, [record.hookRate])

    const msgConversionRateNote: Note = useMemo(() => {
        if (record.messageConversationRate as number >= 40) {
            return { note: 'Good Greetings', status: true }
        } else {
            return { note: 'Need to improve greetings', status: false }
        }
    }, [record.messageConversationRate])

    const notes = useMemo(() => [roasNote, ctrNote, cpmNote, hookRateNote, msgConversionRateNote], [
        cpmNote, ctrNote, hookRateNote, msgConversionRateNote, roasNote
    ])

    const currencyFormatter = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const percentageFormatter = (value: number): string => {
        return `${(value).toFixed(2)}%`;
    };

    return <tr>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{day}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{currencyFormatter(record.amountSpent as number)}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{roas}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{percentageFormatter(record.ctr as number)}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{currencyFormatter(record.cpm as number)}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{percentageFormatter(record.hookRate as number)}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{percentageFormatter(record.messageConversationRate as number)}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">
            <div className="space-y-1">
                {
                    notes.map(note => <p className={`${note.status ? 'bg-green-500' : 'bg-red-500'} text-white text-center rounded-md`} key={`notes-${day}-${note.note}`}>{note.note}</p>)
                }
            </div>
        </td>
    </tr>
}

export default DataRow
