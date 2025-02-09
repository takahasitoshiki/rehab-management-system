import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { scheduleColumns } from "@/constants/scheduleColumns";
import { fetchTherapistList } from "@/services/therapist/fetchTherapist";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // ✅ isBetween プラグインをインポート
dayjs.extend(isBetween);

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
  dataSource: TimeSlot[];
  handleRowDoubleClick: (record: TimeSlot) => void;
  selectedDates: [Dayjs, Dayjs];
}

const TherapistScheduleTable: React.FC<TherapistScheduleTableProps> = ({
  dataSource,
  handleRowDoubleClick,
  selectedDates,
}) => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(!therapists.length);

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        const therapistData = await fetchTherapistList();
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

  // ✅ `onCell` の修正: 既存の `onCell` を保持
  const modifiedColumns = scheduleColumns.map((column) => ({
    ...column,
    onCell: (record: TimeSlot) => ({
      ...(column.onCell ? column.onCell(record) : {}),
      onDoubleClick: () => handleRowDoubleClick(record),
    }),
  }));
  console.log("取得した選択日付"+selectedDates);
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        maxWidth: "120vw",
      }}
    >
    {(selectedDates || []).map((date) =>
        therapists.map((therapist) => (
          <div key={`${therapist.therapist_id}-${date.format("YYYY-MM-DD")}`} style={{ flexShrink: 0 }}>
            <Table<TimeSlot>
              className="custom-table"
              columns={modifiedColumns}
              title={() => `${therapist.username} (${date.format("YYYY-MM-DD")})`}
              dataSource={dataSource}
              loading={loading}
              pagination={false}
              bordered
              size="small"
              style={{ tableLayout: "fixed" }}
            />
          </div>
        ))
      )}
    </div>
  );
 };

export default TherapistScheduleTable;
