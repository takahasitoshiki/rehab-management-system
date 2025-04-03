import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPatients } from "@/store/slices/patientsSlice";
import { useDrag } from "react-dnd";
import { Patient } from "@/types/patient";


const PatientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { patients, loading } = useAppSelector((state) => state.patients);

  const columns = [
    { title: "患者コード", dataIndex: "patients_code", key: "patients_code" },
    { title: "患者名", dataIndex: "patients_name", key: "patients_name" },
    { title: "種別", dataIndex: "classification", key: "classification" },
  ];

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  //  ドラッグ可能な行コンポーネント
  const DraggableRow: React.FC<{ children?: React.ReactNode; "data-row-key"?: string; patients: Patient[] }> = ({
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
        return record ? { patient: record } : { patient: null }; 
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <tr
        {...props}
        ref={record ? drag : undefined} 
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: record ? "move" : "default", 
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
              row: (props: React.HTMLAttributes<HTMLTableRowElement>) => {
                return <DraggableRow {...props} patients={patients} />; 
              },
            },
          }}
        />
      )}
    </SectionWrapper>
  );
};

export default PatientList;
