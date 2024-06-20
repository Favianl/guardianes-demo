import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { treeImages } from '../../helpers/TreeImages.js';
import styles from './AdoptionInfo.module.css';
import { useUser } from '../../context/UserContext';
import { useLand } from '../../context/LandContext';
import TimeLine from '../TimeLine/TimeLine';
import TreeInfo from '../TreeInfo/TreeInfo';
import EditableField from '../EditableField/EditableField.jsx';
import Loader from '../Loader/Loader.jsx';
import { useEffect } from 'react';

const AdoptionInfo = () => {
  const { adoptions } = useUser();
  const { land } = useLand();
  const { id } = useParams();

  const navigate = useNavigate();

  const adoptionData = adoptions.find((item) => item.adoptionId === id);

  useEffect(() => {
    if (!adoptionData) navigate('/profile');
  }, []);

  if (!land) return <Loader fullscreen={true} />;

  const zoneInfo = land.find((item) => item.id === adoptionData.landId);

  return (
    <div className={styles.adoptionInfoContainer}>
      <Link className={styles.adoptionInfoBackBtn} to={'/profile'}>
        <FaArrowLeft size={32} />
      </Link>
      <div className={styles.totalCont}>
        <div className={styles.adoptionInfoContent}>
          <div className={styles.adoptionInfoImgCont}>
            <img
              src={treeImages[adoptionData.typeId]}
              alt='imagen tipo de árbol'
            />
          </div>

          <div className={styles.adoptionInfoText}>
            <div>
              <h4>
                {adoptionData.typeName} (
                <em>{adoptionData.typeScientificName}</em>)
              </h4>
              <p className={styles.text}>
                Nombre común: {adoptionData.typeCommonName}
              </p>

              <div className={styles.customNameContainer}>
                <p>Nombre personalizado:</p>
                <EditableField
                  initialText={
                    adoptionData.customName
                      ? adoptionData.customName
                      : 'Sin nombre'
                  }
                  adoptionId={adoptionData.adoptionId}
                />
              </div>

              <p className={styles.textZone}>Zona: {zoneInfo.place}</p>
              <p className={styles.text}>{adoptionData.description}</p>
              <p>
                Fecha de adopción: <strong>{adoptionData.adoptionDate}</strong>
              </p>
            </div>
            <div>
              <TreeInfo />
            </div>
          </div>
        </div>
        <div>
          <TimeLine />
        </div>
      </div>
    </div>
  );
};

export default AdoptionInfo;
