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
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, selectDateRange } from "@/store/slices/dateSlice";
import PatientRegistrationContent from "../../components/main/headerBtnComponent/PatientRegistrationContent";
import { Dayjs } from "dayjs";

type ButtonData = {
  iconSrc: string;
  altText: string;
  modalContent?: React.ReactNode;
  sectionKey?: "patients" | "schedules" | "achievements"; // sectionKeyがある場合
};

interface CustomHeaderProps {
  setVisibleSections: React.Dispatch<
    React.SetStateAction<{
      patients: boolean;
      schedules: boolean;
      achievements: boolean;
    }>
  >;
  onChange: (dates: [Dayjs, Dayjs]) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  setVisibleSections,
}) => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(selectDateRange);
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
      setVisibleSections((prev) => ({
        ...prev,
        [sectionKey]: true,
      }));
      return;
    }
    // セクションキーがない場合はモーダルを表示
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
      dispatch(setDateRange({ 
        startDate: dates[0].format("YYYY-MM-DD"), // ✅ 文字列に変換して保存
        endDate: dates[1].format("YYYY-MM-DD")
      }));
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
          onChange={handleDateChange} // ✅ onChange に修正
          format="YYYY-MM-DD"
          value={[startDate, endDate]} // Reduxの値を反映
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
