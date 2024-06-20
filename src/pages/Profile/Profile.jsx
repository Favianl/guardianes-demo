import UserInfo from '../../components/UserInfo/UserInfo';
import MyAdoptions from '../../components/MyAdoptions/MyAdoptions';
import styles from './Profile.module.css';
// import { FaChevronRight } from "react-icons/fa";
import UserCategory from '../../components/UserCategory/UserCategory';
import { useUser } from '../../context/UserContext';
import { FaChevronDown } from 'react-icons/fa6';

const Profile = () => {
  const { adoptions } = useUser();
  return (
    <div className={styles.profileBox}>
      <div className={styles.profileContainer}>
        <div>
          <button>
            Información personal <FaChevronDown />
          </button>
        </div>
        <UserInfo />
        <br></br>
        <div>
          <MyAdoptions />
        </div>
      </div>

      <UserCategory adoptionNumber={adoptions.length} />
    </div>
  );
};

export default Profile;
