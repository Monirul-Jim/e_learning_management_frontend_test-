import { useAppSelector } from "../redux/feature/hooks";
import {type RootState } from "../redux/feature/store";
import AdminExtraSection from "./ExtraSection/AdminExtraSection";
import StudentExtraSection from "./ExtraSection/StudentExtraSection";

const Information = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <div>
        {user?.is_superuser ? <AdminExtraSection /> : <StudentExtraSection />}
      </div>
    </div>
  );
};

export default Information;
