import React from "react";
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
import { DatePicker } from "antd";
import dayjs,{ Dayjs } from "dayjs"; 

const getStartOfWeek = (): Dayjs => dayjs().startOf('week'); 
const getEndOfWeek = (): Dayjs => dayjs().endOf('week'); 

const CustomHeader: React.FC = () => {
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
        <img src={PatientRegistration} alt="患者一覧" className="icon" />
        <img src={PatientIcon} alt="患者登録" className="icon" />
        <img src={Therapist} alt="セラピスト登録" className="icon" />
        <img src={Reservation_List} alt="カレンダー" className="icon" />
        <img src={Achievements} alt="実績" className="icon" />
        <img src={update} alt="同期" className="icon" />
        <img src={Reset} alt="終了" className="icon" />
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
    </div>
  );
};

export default CustomHeader;
