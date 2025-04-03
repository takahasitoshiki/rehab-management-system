import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, message, Row, Col } from "antd";
import { createTherapist } from "@/api/fetchTherapist";
import { useDispatch } from "react-redux";
import { fetchTherapists } from "@/store/slices/therapistSlice";
const TherapistRegistrationContent = ({ onClose }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const response = await createTherapist(values);
            console.log("登録されたセラピスト情報:", response);
            // 成功メッセージを表示
            message.success("セラピスト情報が登録されました。");
            form.resetFields();
            await dispatch(fetchTherapists());
            onClose();
        }
        catch (error) {
            console.error("登録エラー:" + error);
            message.error("セラピスト情報の登録に失敗しました。");
        }
    };
    return (_jsxs("div", { children: [_jsx("h3", { children: "\u30BB\u30E9\u30D4\u30B9\u30C8\u767B\u9332" }), _jsx("p", { children: "\u4EE5\u4E0B\u306E\u30D5\u30A9\u30FC\u30E0\u306B\u30BB\u30E9\u30D4\u30B9\u30C8\u306E\u60C5\u5831\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "username", label: "\u30E6\u30FC\u30B6\u30FC\u540D", rules: [{ required: true, message: "セラピスト名を入力してください" }], children: _jsx(Input, { placeholder: "\u4F8B: \u7530\u4E2D \u592A\u90CE" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "password", label: "\u30D1\u30B9\u30EF\u30FC\u30C9", rules: [{ required: true, message: "パスワードを入力してください" }], children: _jsx(Input.Password, { placeholder: "\u4F8B: password" }) }) })] }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "\u767B\u9332" }) })] })] }));
};
export default TherapistRegistrationContent;
