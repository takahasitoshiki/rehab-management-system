import { jsx as _jsx } from "react/jsx-runtime";
import { useDrop } from "react-dnd";
const DroppableCell = ({ record, onDropPatient, children }) => {
    const [{ isOver }, dropRef] = useDrop({
        accept: "PATIENT",
        drop: (item) => {
            onDropPatient(record, item.patient);
        },
        collect: (monitor) => ({ isOver: monitor.isOver() }),
    });
    return (_jsx("div", { ref: dropRef, style: { padding: "8px", backgroundColor: isOver ? "#f0f0f0" : "transparent" }, children: children }));
};
export default DroppableCell;
