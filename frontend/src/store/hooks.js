import { useDispatch, useSelector } from "react-redux";
// 型付き dispatch と selector をエクスポート
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
