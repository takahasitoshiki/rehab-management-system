import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { PatientIcon, PatientRegistration, Therapist, Reservation_List, Achievements, 
// update,
Reset, Sending, } from "@/assets/icon";
import "../../pages/Main/CustomHeader.css";
import { DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, selectDateRange } from "@/store/slices/dateSlice";
import PatientRegistrationContent from "../../components/main/headerBtnComponent/PatientRegistrationContent";
import TherapistRegistrationContent from "../../components/main/headerBtnComponent/TherapistRegistrationContent";
import LogoutButton from "../../components/main/headerBtnComponent/LogoutContent";
import { reportCompletedReservations } from "@/store/slices/reservationSlice"; // ← Thunk
const CustomHeader = ({ setVisibleSections }) => {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(selectDateRange);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const buttonData = [
        {
            iconSrc: PatientRegistration,
            altText: "患者登録",
            modalContent: (_jsx(PatientRegistrationContent, { onClose: () => setIsModalVisible(false) })),
        },
        {
            iconSrc: PatientIcon,
            altText: "患者一覧",
            sectionKey: "patients",
        },
        {
            iconSrc: Therapist,
            altText: "セラピスト登録",
            modalContent: (_jsx(TherapistRegistrationContent, { onClose: () => setIsModalVisible(false) })),
        },
        {
            iconSrc: Reservation_List,
            altText: "予約一覧",
            sectionKey: "schedules",
        },
        {
            iconSrc: Achievements,
            altText: "実績一覧",
            sectionKey: "achievements",
        },
        {
            iconSrc: Reset,
            altText: "終了",
            modalContent: _jsx(LogoutButton, {}),
        },
    ];
    const handleIconClick = (sectionKey, content) => {
        if (sectionKey) {
            // セクションを表示
            setVisibleSections((prev) => ({
                ...prev,
                [sectionKey]: true,
            }));
            return;
        }
        // セクションキーがない場合はモーダルを表示
        if (content) {
            setModalContent(React.cloneElement(content, {
                onClose: () => setIsModalVisible(false), // モーダルを閉じる関数
            }));
            setIsModalVisible(true);
        }
    };
    const handleOk = () => {
        setIsModalVisible(false); // モーダルを開く
    };
    const handleCancel = () => {
        setIsModalVisible(false); // モーダルを閉じる
    };
    const { RangePicker } = DatePicker;
    const handleDateChange = (dates) => {
        if (dates && dates[0] && dates[1]) {
            dispatch(setDateRange({
                startDate: dates[0].format("YYYY-MM-DD"), // ✅ 文字列に変換して保存
                endDate: dates[1].format("YYYY-MM-DD"),
            }));
        }
    };
    const handleReportClick = async () => {
        try {
            const result = await dispatch(reportCompletedReservations()).unwrap();
            Modal.success({
                title: "送信完了",
                content: `${result.length} 件の実績を送信しました`,
            });
        }
        catch (error) {
            Modal.error({
                title: "送信失敗",
                content: "実績送信に失敗しました。再度お試しください。",
            });
            console.error("実績送信エラー:", error);
        }
    };
    return (_jsxs("div", { className: "header-container", children: [_jsx("div", { className: "icon-group", children: buttonData.map((button, index) => (_jsx("img", { src: button.iconSrc, alt: button.altText, className: "icon", onClick: () => handleIconClick(button.sectionKey, button.modalContent) }, index))) }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "period", children: "\u671F\u9593" }), _jsx(RangePicker, { id: "period", onChange: handleDateChange, format: "YYYY-MM-DD", value: [startDate, endDate], placeholder: ["開始日", "終了日"], className: "custom-range-picker" })] }), _jsxs("button", { className: "report-button", onClick: handleReportClick, children: [_jsx("img", { src: Sending, alt: "\u5B9F\u7E3E\u5831\u544A", className: "button-icon" }), "\u5B9F\u7E3E\u5831\u544A"] }), _jsx(Modal, { open: isModalVisible, onOk: handleOk, onCancel: handleCancel, footer: null, children: modalContent })] }));
};
export default CustomHeader;
