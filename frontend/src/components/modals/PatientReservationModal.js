import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Modal, Form, Input, Select, DatePicker, message, } from "antd";
import locale from "antd/es/date-picker/locale/ja_JP";
import "dayjs/locale/ja";
import { createReservation, updateReservation } from "@/api/fetchReservation";
import { getReservations, getCompletedReservations } from "@/store/slices/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchTherapists } from "@/store/slices/therapistSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
const { Option } = Select;
const PatientReservationModal = ({ isModalVisible, setIsModalVisible, form, patients, loading, generateTimeOptions, editingReservation, }) => {
    const dispatch = useDispatch();
    const therapists = useSelector((state) => state.therapists.therapists);
    // セラピスト一覧を取得
    useEffect(() => {
        if (therapists.length === 0) {
            dispatch(fetchTherapists());
        }
    }, [dispatch, therapists.length]);
    useEffect(() => {
        if (editingReservation) {
            console.log("🆔 編集モード - 予約ID:", editingReservation._id); // ✅ 確認用ログ
            // ✅ 編集モードのとき
            form.setFieldsValue({
                therapist_id: editingReservation.therapist_id, // セラピストID
                patientName: patients.find((p) => p.patients_code === editingReservation.patient_code)?.patients_name || "", // 患者名をセット
                date: editingReservation.date ? dayjs(editingReservation.date) : null, // 日付
                time: editingReservation.time, // 時間
                remarks: editingReservation.note, // 備考
                completed: editingReservation.completed, // ✅ 完了ステータス
                rehabilitation_details: editingReservation.rehabilitation_details, // ✅ リハビリ内容
            });
        }
    }, [editingReservation, form, patients]); // ✅ 依存配列
    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const requestData = {
                _id: editingReservation?._id || undefined, // ✅ 既存データのIDを保持
                patient_code: patients.find((p) => p.patients_name === values.patientName)
                    ?.patients_code || "",
                therapist_id: values.therapist_id,
                date: values.date.format("YYYY-MM-DD"),
                time: values.time,
                note: values.remarks || "",
                completed: values.completed, // ✅ 完了ステータス
                rehabilitation_details: values.rehabilitation_details, // ✅ リハビリ内容
            };
            if (editingReservation) {
                await updateReservation(requestData); // ✅ 更新処理を実行
                message.success("予約が更新されました");
            }
            else {
                await createReservation(requestData); // ✅ 新規作成
                message.success("予約が登録されました");
            }
            // 予約リストを全て取り直す
            dispatch(getReservations());
            dispatch(getCompletedReservations()); // ✅ 完了済み予約も取得
            form.resetFields();
            setIsModalVisible(false);
        }
        catch (error) {
            console.error(error);
            message.error("予約の登録/更新に失敗しました");
        }
    };
    return (_jsx(Modal, { title: editingReservation ? "予約編集" : "患者予約", open: isModalVisible, onOk: onSubmit, onCancel: () => setIsModalVisible(false), okText: editingReservation ? "更新" : "予約", cancelText: "\u30AD\u30E3\u30F3\u30BB\u30EB", children: _jsxs(Form, { form: form, layout: "vertical", children: [_jsx(Form.Item, { name: "therapist_id", label: "\u30BB\u30E9\u30D4\u30B9\u30C8", rules: [
                        { required: true, message: "セラピストを選択してください。" },
                    ], children: _jsx(Select, { placeholder: "\u30BB\u30E9\u30D4\u30B9\u30C8\u3092\u9078\u629E", children: therapists.map((therapist) => (_jsxs(Option, { value: therapist.therapist_id, children: [therapist.username, " "] }, therapist.therapist_id))) }) }), _jsx(Form.Item, { name: "patientName", label: "\u60A3\u8005\u540D", rules: [{ required: true, message: "患者名を入力してください" }], children: _jsx(Select, { placeholder: "\u60A3\u8005\u540D", loading: loading, children: patients.map((patient) => (_jsx(Option, { value: patient.patients_name, children: patient.patients_name }, patient.patients_code))) }) }), _jsx(Form.Item, { name: "date", label: "\u4E88\u7D04\u65E5", rules: [{ required: true, message: "予約日を入力してください。" }], children: _jsx(DatePicker, { style: { width: "100%" }, locale: locale }) }), _jsx(Form.Item, { name: "time", label: "\u4E88\u7D04\u6642\u9593", rules: [{ required: true, message: "予約時間を選択してください。" }], children: _jsx(Select, { placeholder: "\u6642\u9593\u3092\u9078\u629E", children: generateTimeOptions().map((time) => (_jsx(Option, { value: time, children: time }, time))) }) }), _jsx(Form.Item, { name: "remarks", label: "\u5099\u8003", children: _jsx(Input, { placeholder: "\u4F8B\uFF1A\u672C\u65E5\u306E\u30EA\u30CF\u30D3\u30EA\u5185\u5BB9" }) }), _jsx(Form.Item, { name: "rehabilitation_details", label: "\u30EA\u30CF\u30D3\u30EA\u5185\u5BB9", children: _jsx(Input.TextArea, { placeholder: "\u30EA\u30CF\u30D3\u30EA\u306E\u8A73\u7D30\u3092\u5165\u529B" }) }), _jsx(Form.Item, { name: "completed", label: "\u5B8C\u4E86\u30B9\u30C6\u30FC\u30BF\u30B9", initialValue: false, children: _jsxs(Select, { placeholder: "\u5B8C\u4E86\u72B6\u614B\u3092\u9078\u629E", children: [_jsx(Option, { value: false, children: "\u672A\u5B8C\u4E86" }), _jsx(Option, { value: true, children: "\u5B8C\u4E86" })] }) })] }) }));
};
export default PatientReservationModal;
