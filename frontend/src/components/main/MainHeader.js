import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MainHeader = ({ title, onClose, onMaximize }) => {
    return (_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", backgroundColor: "#b9d0d0", borderRadius: "8px 8px 0 0" }, children: [_jsx("h3", { style: { margin: 0 }, children: title }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [onMaximize && ( // onMaximize がある場合のみ表示
                    _jsx("button", { onClick: onMaximize, style: { padding: "5px 10px", backgroundColor: "#d9f7be", border: "1px solid #91d5ff", borderRadius: "5px", cursor: "pointer" }, children: "\uD83D\uDDD6" })), _jsx("button", { onClick: onClose, style: { padding: "5px 10px", backgroundColor: "#ffa39e", border: "1px solid #ff7875", borderRadius: "5px", cursor: "pointer" }, children: "\u2716" })] })] }));
};
export default MainHeader;
