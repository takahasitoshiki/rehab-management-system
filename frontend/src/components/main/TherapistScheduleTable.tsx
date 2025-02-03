import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";
import { fetchTherapistList } from "@/services/therapist/fetchTherapist";
import dayjs,{ Dayjs } from "dayjs";


type TimeSlot = {
  key: string;
  hour: string;
  minute: string;
  patient: string;
};

interface Therapist {
  therapist_id: string;
  username: string;
}


interface TherapistScheduleTableProps {
  therapists: Therapist[];
  dataSource: TimeSlot[];
  loading: boolean;
  handleRowDoubleClick: (record: TimeSlot) => void;
  selectedDates: [Dayjs, Dayjs] | null; // ✅ 追加
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,

}) => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        const therapistData = await fetchTherapistList();
        console.log("取得したセラピストデータ:", therapistData);
        if (!Array.isArray(therapistData)) {
          throw new Error("取得したデータが配列ではありません！");
        }
        setTherapists(therapistData);
      } catch (error) {
        console.error("エラー内容:", error);
        message.error("セラピスト情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadTherapists();
  }, []);

    // ✅ 選択された期間でフィルタリングする処理（必要なら）
    const filteredDataSource = selectedDates
    ? dataSource.filter((slot) =>
        dayjs().isBetween(selectedDates[0], selectedDates[1], "day", "[]")
      )
    : dataSource;



  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        maxWidth: "120vw",
      }}
    >
      {therapists.map((therapist) => (
        <div
          key={therapist.therapist_id}
          style={{ flexShrink: 0}}
        >
          <Table<TimeSlot>
            className="custom-table"
            columns={scheduleColumns.map((column) => ({
              ...column,
              onCell: (record: TimeSlot) => ({
                onDoubleClick: () => handleRowDoubleClick(record),
              }),
            }))}
            title={() => `${therapist.username}`}
            dataSource={filteredDataSource} // ✅ フィルタリングしたデータを渡す
            loading={loading}
            pagination={false}
            bordered
            size="small"
            style={{ tableLayout: "fixed" }}
          />
        </div>
      ))}
    </div>
  );
};

export default TherapistScheduleTable;