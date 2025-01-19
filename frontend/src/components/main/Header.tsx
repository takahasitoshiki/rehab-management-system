import React, { useState } from "react";
import {
  PatientIcon,
  PatientRegistration,
  Therapist,
  Reservation_List,
  Achievements,
  update,
  Reset,
  Sending,
} from "@/assets/icon";
import "../../pages/Main/CustomHeader.css";
import { DatePicker, Modal, Button } from "antd";
import PatientRegistrationContent from "../../components/main/headerBtnComponent/PatientRegistrationContent";
// import PatientListContent from "../../components/main/headerBtnComponent/PatientListContent";
// import TherapistContent from "../../components/main/headerBtnComponent/TherapistContent";
// import ReservationListContent from "../../components/main/headerBtnComponent/ReservationListContent";
// import AchievementsContent from "../../components/main/headerBtnComponent/AchievementsContent";
// import SyncContent from "../../components/main/headerBtnComponent/SyncContent";
// import ResetContent from "../../components/main/headerBtnComponent/ResetContent";
import dayjs, { Dayjs } from "dayjs";

const getStartOfWeek = (): Dayjs => dayjs().startOf("week");
const getEndOfWeek = (): Dayjs => dayjs().endOf("week");

const CustomHeader: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const buttonData = [
    {
      iconSrc: PatientRegistration,
      altText: "患者登録",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: PatientIcon,
      altText: "患者一覧",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Therapist,
      altText: "セラピスト登録",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Reservation_List,
      altText: "予約一覧",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Achievements,
      altText: "実績一覧",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: update,
      altText: "同期",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Reset,
      altText: "終了",
      modalContent: <PatientRegistrationContent />,
    },
  ];

  const handleIconClick = (content: React.ReactNode) => {
    console.log("Modal triggered");
    setModalContent(content); // モーダルに表示する内容を設定
    setIsModalVisible(true); // モーダルを表示
  };

  const handleOk = () => {
    setIsModalVisible(false); // モーダルを閉じる
  };

  const handleCancel = () => {
    setIsModalVisible(false); // モーダルを閉じる
  };

  const { RangePicker } = DatePicker;
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    console.log("選択された期間:", dates, dateStrings);
  };

  return (
    <div className="header-container">
      <div className="icon-group">
        {buttonData.map((button, index) => (
          <img
            key={index}
            src={button.iconSrc}
            alt={button.altText}
            className="icon"
            onClick={() => handleIconClick(button.modalContent)}
          />
        ))}
      </div>
      <div className="input-group">
        <label htmlFor="period">期間</label>
        <RangePicker
          id="period"
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          defaultValue={[getStartOfWeek(), getEndOfWeek()]}
          placeholder={["開始日", "終了日"]}
          className="custom-range-picker"
        />
      </div>
      <button className="report-button">
        <img src={Sending} alt="実績報告" className="button-icon" />
        実績報告
      </button>

      {/* ダイアログの表示 */}
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // フッターを非表示にする
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default CustomHeader;