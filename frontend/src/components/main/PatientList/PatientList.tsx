import React, { useEffect, useState } from "react";
import { message, Table, Spin } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { fetchPatientsList } from "@/services/patients/fetchPatients";

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
      setLoading(true); //ローディング開始
      try {
        const data = await fetchPatientsList();
        setPatients(data);
        console.log("データ:"+data)
      } catch (error) {
        console.error("エラー詳細:" + error);
        message.error("患者情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  },[]);

  return (
    <SectionWrapper>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={Array.isArray(patients) ? patients : []} // 配列かどうか確認
          rowKey="_id"
          pagination={false}
        />
      )}
    </SectionWrapper>
  );
};

export default PatientList;
