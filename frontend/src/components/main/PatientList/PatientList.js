import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Table, Spin } from "antd";
import SectionWrapper from "@/styles/SectionWrapper";
// import { fetchPatientsList } from "@/api/fetchPatients";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPatients } from "@/store/slices/patientsSlice";
import { useDrag } from "react-dnd";
const PatientList = () => {
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
    // ✅ ドラッグ可能な行コンポーネント
    const DraggableRow = ({ children, "data-row-key": dataRowKey, patients, ...props }) => {
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
        return (_jsx("tr", { ...props, ref: record ? drag : undefined, style: {
                opacity: isDragging ? 0.5 : 1,
                cursor: record ? "move" : "default", // ✅ `record` がない場合はカーソルを変更
            }, children: children }));
    };
    return (_jsx(SectionWrapper, { children: loading ? (_jsx("div", { style: { textAlign: "center", padding: "20px" }, children: _jsx(Spin, { size: "large" }) })) : (_jsx(Table, { columns: columns, dataSource: patients, rowKey: "_id", pagination: false, components: {
                body: {
                    row: (props) => {
                        return _jsx(DraggableRow, { ...props, patients: patients }); // ✅ `patients` を渡す
                    },
                },
            } })) }));
};
export default PatientList;
