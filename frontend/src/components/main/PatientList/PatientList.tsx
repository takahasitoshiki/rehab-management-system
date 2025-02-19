import React, { useEffect, useState } from "react";
import { message, Table, Spin } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { fetchPatientsList } from "@/services/patients/fetchPatients";
import { useDrag } from "react-dnd";

interface Patient {
  _id: string;
  patients_code: string;
  patients_name: string;
  classification: string;
}
interface RowProps {
  children: React.ReactNode;
  "data-row-key"?: string;
  patients: Patient[]; // ✅ `patients` を追加
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "患者コード", dataIndex: "patients_code", key: "patients_code" },
    { title: "患者名", dataIndex: "patients_name", key: "patients_name" },
    { title: "種別", dataIndex: "classification", key: "classification" },
  ];

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const data = await fetchPatientsList();
        if (!Array.isArray(data)) throw new Error("データが配列ではありません");
        setPatients(data);
      } catch (error) {
        console.error("エラー:", error);
        message.error("患者情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  }, []);

  // ✅ ドラッグ可能な行コンポーネント
  const DraggableRow: React.FC<{ children: React.ReactNode; "data-row-key"?: string; patients: Patient[] }> = ({
    children,
    "data-row-key": dataRowKey,
    patients,
    ...props
  }) => {
  
    // `record` を `patients` から取得
    const record = dataRowKey ? patients.find((p) => p._id === dataRowKey) : null;
  
    // `useDrag` を常に呼び出す
    const [{ isDragging }, drag] = useDrag({
      type: "PATIENT",
      item: () => {
        return record ? { patient: record } : { patient: null }; // ✅ `record` が null でも `useDrag` を実行
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <tr
        {...props}
        ref={record ? drag : undefined} // ✅ `record` があるときだけ `drag` を適用
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: record ? "move" : "default", // ✅ `record` がない場合はカーソルを変更
        }}
      >
        {children}
      </tr>
    );
  };

  return (
    <SectionWrapper>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={patients}
          rowKey="_id"
          pagination={false}
          components={{
            body: {
              row: (props) => {
                return <DraggableRow {...props} patients={patients} />; // ✅ `patients` を渡す
              },
            },
          }}
        />
      )}
    </SectionWrapper>
  );
};

export default PatientList;
