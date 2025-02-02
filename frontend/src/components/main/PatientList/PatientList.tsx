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
  const DraggableRow: React.FC<{ record: Patient; index: number }> = ({
    record,
    index,
    ...props
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "PATIENT",
      item: { patient: record }, // ドラッグするデータ
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <tr
        {...props}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
      />
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
              row: DraggableRow, // 各行をドラッグ可能にする
            },
          }}
        />
      )}
    </SectionWrapper>
  );
};

export default PatientList;