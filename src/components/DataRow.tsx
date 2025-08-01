import {Record} from "@/model/Record";
import {useMemo} from "react";

interface Note {
    status: boolean;
    note: string;
}

const DataRow = ({ day, record}: {day: number, record: Record}) => {
    const roasNote: Note = useMemo(() => {
        if (record.roas >= 6) {
            return { note: 'High ROAS', status: true }
        } else if (record.roas >= 3 && record.roas < 6) {
            return { note: 'Good ROAS', status: true }
        } else {
            return { note: 'Low ROAS', status: false }
        }
    }, [record.roas])

    const ctrNote: Note = useMemo(() => {
        if (record.ctr >= 1.5) {
            return { note: 'High CTR', status: true }
        } else {
            return { note: 'Low CTR', status: false }
        }
    }, [record.ctr])

    const cpmNote: Note = useMemo(() => {
        if (record.ctr <= 15) {
            return { note: 'Good CPM', status: true }
        } else {
            return { note: 'Bad CPM', status: false }
        }
    }, [record.ctr])

    const hookRateNote: Note = useMemo(() => {
        if (record.hookRate >= 40) {
            return { note: 'Good Hook', status: true }
        } else {
            return { note: 'Need to improve Hook', status: false }
        }
    }, [record.hookRate])

    const msgConversionRateNote: Note = useMemo(() => {
        if (record.messageConversationRate >= 40) {
            return { note: 'Good Greetings', status: true }
        } else {
            return { note: 'Need to improve greetings', status: false }
        }
    }, [record.messageConversationRate])

    const notes = useMemo(() => [roasNote, ctrNote, cpmNote, hookRateNote, msgConversionRateNote], [
        cpmNote, ctrNote, hookRateNote, msgConversionRateNote, roasNote
    ])

    return <tr>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{day}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.amountSpent}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.roas}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.ctr}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.cpm}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.hookRate}</td>
        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-center">{record.messageConversationRate}</td>
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
