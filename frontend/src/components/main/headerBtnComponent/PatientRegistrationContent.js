import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Select, DatePicker, Button, message, Row, Col, } from "antd";
import dayjs from "dayjs";
import { useAppDispatch } from "@/store/hooks";
import { registerPatient, getPatients } from "@/store/slices/patientsSlice";
const { Option } = Select;
const PatientRegistrationContent = ({ onClose, }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const handleSubmit = async (values) => {
        try {
            const { date_of_birth, registration_date, ...rest } = values;
            const dataToSend = {
                ...rest,
                date_of_birth: dayjs(date_of_birth).toISOString(),
                registration_date: dayjs(registration_date).toISOString(),
            };
            await dispatch(registerPatient(dataToSend));
            message.success("患者情報が登録されました。");
            form.resetFields();
            onClose();
            dispatch(getPatients());
        }
        catch (error) {
            console.error("登録エラー:", error);
            message.error("患者情報の登録に失敗しました。");
        }
    };
    return (_jsxs("div", { children: [_jsx("h3", { children: "\u60A3\u8005\u767B\u9332" }), _jsx("p", { children: "\u4EE5\u4E0B\u306E\u30D5\u30A9\u30FC\u30E0\u306B\u60A3\u8005\u306E\u60C5\u5831\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, initialValues: {
                    registration_date: dayjs(), // 今日の日付を初期値として設定
                    date_of_birth: dayjs("2000-01-01"), // 生年月日を2000/1/1に設定
                    gender: "",
                    classification: "",
                }, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "patients_name", label: "\u60A3\u8005\u540D", rules: [{ required: true, message: "患者名を入力してください" }], children: _jsx(Input, { placeholder: "\u4F8B: \u7530\u4E2D \u592A\u90CE" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "disease_name", label: "\u75BE\u60A3\u540D", rules: [{ required: true, message: "疾患名を入力してください" }], children: _jsx(Input, { placeholder: "\u4F8B: \u8170\u75DB" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "classification", label: "\u5206\u985E", rules: [{ required: true, message: "分類を選択してください" }], children: _jsxs(Select, { placeholder: "\u5206\u985E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044", children: [_jsx(Option, { value: "\u4E00\u822C", children: "\u4E00\u822C" }), _jsx(Option, { value: "\u7DCA\u6025", children: "\u7DCA\u6025" })] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "date_of_birth", label: "\u751F\u5E74\u6708\u65E5", rules: [
                                        { required: true, message: "生年月日を入力してください" },
                                    ], children: _jsx(DatePicker, { style: { width: "100%" }, placeholder: "\u751F\u5E74\u6708\u65E5\u3092\u9078\u629E" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "gender", label: "\u6027\u5225", rules: [{ required: true, message: "性別を選択してください" }], children: _jsxs(Select, { placeholder: "\u6027\u5225\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044", children: [_jsx(Option, { value: "1", children: "\u7537\u6027" }), _jsx(Option, { value: "2", children: "\u5973\u6027" })] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "registration_date", label: "\u767B\u9332\u65E5", rules: [{ required: true, message: "登録日を入力してください" }], children: _jsx(DatePicker, { style: { width: "100%" }, placeholder: "\u767B\u9332\u65E5\u3092\u9078\u629E" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "treatment_plan", label: "\u6CBB\u7642\u8A08\u753B", rules: [
                                        { required: true, message: "治療計画を入力してください" },
                                    ], children: _jsx(Input, { placeholder: "\u4F8B: \u90313\u56DE\u306E\u30EA\u30CF\u30D3\u30EA" }) }) }), _jsx(Col, { span: 24, children: _jsx(Form.Item, { name: "note", label: "\u5099\u8003", children: _jsx(Input.TextArea, { placeholder: "\u5099\u8003\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044 (\u4EFB\u610F)" }) }) })] }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "\u767B\u9332" }) })] })] }));
};
export default PatientRegistrationContent;
