"use client";

import {useState} from "react";
import FormModal from "@/components/FormModal";
import {Record} from "@/model/Record";
import DataTable from "@/components/DataTable";


export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [records, setRecords] = useState<Record[]>([]);

    const appendData = (record: Record) => {
        setRecords((value) => [...value, record]);
    }

  return (
    <div className="font-sans">
      <main className="w-full max-w-6xl mx-auto my-20">
          <p className="text-lg pb-4 md:text-2xl lg:text-4xl font-bold text-center">Creative Ads Performance Analysis </p>

          <div className="border border-gray-200 rounded-2xl px-4 py-8">
              <div>
                  <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setIsOpen(true)}>Add Data</button>
              </div>

              <FormModal isOpen={isOpen} setIsOpen={setIsOpen} onChange={appendData}/>

              <DataTable records={records}/>
          </div>
      </main>
    </div>
  );
}
