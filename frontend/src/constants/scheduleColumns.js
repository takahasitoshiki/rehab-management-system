import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tag } from "antd";
import DroppableCell from "@/components/main/DroppableCell";
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
            const isCompleted = record.reservations?.[0]?.completed;
            return (_jsx(DroppableCell, { record: record, onDropPatient: onDropPatient, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5em" }, children: [_jsx("span", { children: record.patient }), isCompleted && _jsx(Tag, { color: "green", children: "\u5B8C\u4E86" })] }) }));
        },
    }
];
