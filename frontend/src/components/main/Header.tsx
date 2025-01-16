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
import dayjs, { Dayjs } from "dayjs";

const getStartOfWeek = (): Dayjs => dayjs().startOf("week");
const getEndOfWeek = (): Dayjs => dayjs().endOf("week");

const CustomHeader: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleIconClick = (content: string) => {
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
        <img
          src={PatientRegistration}
          alt="患者登録"
          className="icon"
          onClick={() => handleIconClick("患者登録")}
        />
        <img
          src={PatientIcon}
          alt="患者一覧"
          className="icon"
          onClick={() => handleIconClick("患者一覧")}
        />
        <img
          src={Therapist}
          alt="セラピスト登録"
          className="icon"
          onClick={() => handleIconClick("セラピスト登録")}
        />
        <img
          src={Reservation_List}
          alt="予約一覧"
          className="icon"
          onClick={() => handleIconClick("予約一覧")}
        />
        <img
          src={Achievements}
          alt="実績一覧"
          className="icon"
          onClick={() => handleIconClick("実績一覧")}
        />
        <img
          src={update}
          alt="同期"
          className="icon"
          onClick={() => handleIconClick("同期")}
        />
        <img
          src={Reset}
          alt="終了"
          className="icon"
          onClick={() => handleIconClick("終了")}
        />
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
        title="詳細情報"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            キャンセル
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>{modalContent}</p>
      </Modal>

    </div>

  );
};

export default CustomHeader;
