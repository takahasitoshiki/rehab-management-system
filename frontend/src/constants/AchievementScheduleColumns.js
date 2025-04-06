import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DroppableCell from "@/components/main/DroppableCell";
import { Tag } from "antd";
export const createScheduleColumns = (onDropPatient) => [
    {
        dataIndex: "hour",
        key: "hour",
        width: 60,
        onCell: (record) => ({ rowSpan: record.hourRowSpan }),
        render: (value, record) => record.hourRowSpan === 0 ? null : value,
    },
    {
        dataIndex: "minute",
        key: "minute",
        width: 60,
        onCell: (record) => ({ rowSpan: record.minuteRowSpan }),
        render: (value, record) => record.minuteRowSpan === 0 ? null : value,
    },
    {
        dataIndex: "patient",
        key: "patient",
        width: 250,
        render: (_, record) => {
            const isReported = record.reservations?.[0]?.reported;
            return (_jsx(DroppableCell, { record: record, onDropPatient: onDropPatient, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [_jsx("span", { children: record.patient }), isReported && _jsx(Tag, { color: "blue", children: "\u9001\u4FE1\u6E08\u307F" })] }) }));
        },
    },
];
