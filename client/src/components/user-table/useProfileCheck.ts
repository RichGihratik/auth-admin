import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  isRequestFailed,
  refreshProfile
} from '@/store';
import { RoutePaths } from '@/router';

export function useProfileCheck() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return async function profileCheck(res: unknown) {
    if (isRequestFailed(res)) {
      const { payload } = await dispatch(refreshProfile());
      if (isRequestFailed(payload)) navigate(RoutePaths.Auth);    
    }
  }
}