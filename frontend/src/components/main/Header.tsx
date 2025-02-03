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
import { DatePicker, Modal } from "antd";
import PatientRegistrationContent from "../../components/main/headerBtnComponent/PatientRegistrationContent";
// import PatientListContent from "../../components/main/headerBtnComponent/PatientListContent";
// import TherapistContent from "../../components/main/headerBtnComponent/TherapistContent";
// import ReservationListContent from "../../components/main/headerBtnComponent/ReservationListContent";
// import AchievementsContent from "../../components/main/headerBtnComponent/AchievementsContent";
// import SyncContent from "../../components/main/headerBtnComponent/SyncContent";
// import ResetContent from "../../components/main/headerBtnComponent/ResetContent";
import dayjs, { Dayjs } from "dayjs";

type ButtonData = {
  iconSrc: string;
  altText: string;
  modalContent?: React.ReactNode;
  sectionKey?: "patients" | "schedules" | "achievements"; // sectionKeyがある場合
};

const getStartOfWeek = (): Dayjs => dayjs().startOf("week");
const getEndOfWeek = (): Dayjs => dayjs().endOf("week");

interface CustomHeaderProps {
  setVisibleSections: React.Dispatch<
    React.SetStateAction<{
      patients: boolean;
      schedules: boolean;
      achievements: boolean;
    }>
  >;
  onDateChange: (dates: [Dayjs, Dayjs]) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  setVisibleSections,
  onDateChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const buttonData: ButtonData[] = [
    {
      iconSrc: PatientRegistration,
      altText: "患者登録",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: PatientIcon,
      altText: "患者一覧",
      sectionKey: "patients",
    },
    {
      iconSrc: Therapist,
      altText: "セラピスト登録",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Reservation_List,
      altText: "予約一覧",
      sectionKey: "schedules",
      modalContent: <PatientRegistrationContent />,
    },
    {
      iconSrc: Achievements,
      altText: "実績一覧",
      sectionKey: "achievements",
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

  const handleIconClick = (
    sectionKey: "patients" | "schedules" | "achievements" | undefined,
    content: React.ReactNode
  ) => {
    if (sectionKey) {
      // セクションを表示
      console.log("sectionKey:", sectionKey);
      setVisibleSections((prev) => ({
        ...prev,
        [sectionKey]: true,
      }));
      return;
    }
    // セクションキーがない場合はモーダルを表示
    console.log("セクションキーがありません。モーダルを表示します。");
    if (content) {
      setModalContent(content);
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

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      console.log(
        "選択された期間:",
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD")
      );
      onDateChange([dates[0], dates[1]]);
    }
  };

  return (
    <div className="header-container">
      <div className="icon-group">
        {buttonData.map((button: ButtonData, index: number) => (
          <img
            key={index}
            src={button.iconSrc}
            alt={button.altText}
            className="icon"
            onClick={() =>
              handleIconClick(button.sectionKey, button.modalContent)
            }
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
