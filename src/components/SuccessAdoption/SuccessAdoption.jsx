import { Link, Navigate } from 'react-router-dom';
import TreeAmico from '../../assets/tree-amico.png';
import { useUser } from '../../context/UserContext';
import styles from './SuccessAdoption.module.css';

function SuccessAdoption() {
  const { isAuth } = useUser();

  if (!isAuth) return <Navigate to={'/login'} />;

  return (
    <div className={styles.sucessContainer}>
      <div className={styles.successAdoption}>
        <h3>¡Adoptaste un árbol!</h3>
        <img src={TreeAmico} alt='' />
        <p>
          Vas a poder hacerle un seguimiento sobre su crecimiento y recibir
          actualizaciones periódicas para mantenerte informado sobre su
          desarrollo.
        </p>
        <Link className={styles.sucessContainerBtn} to='/profile'>
          Configurar un árbol
        </Link>
      </div>
    </div>
  );
}

export default SuccessAdoption;
