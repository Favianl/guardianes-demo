import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLand } from '../../context/LandContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PurchaseSummary from '../PurchaseSummary/PurchaseSummary';
import styles from './ShoppingCar.module.css';
import Swal from 'sweetalert2';

import Loader from '../Loader/Loader';

const ShoppingCar = () => {
  const [loadingSimulated, setLoadingSimulated] = useState(false);
  const [randomUUID, setRandomUUID] = useState(false);

  const { setAdoptions } = useUser();

  const { purchase, setPurchase } = useLand();

  const navigate = useNavigate();

  useEffect(() => {
    if (purchase.length < 1) {
      navigate('/adoption');
    }

    if (self && self.crypto && typeof self.crypto.randomUUID === 'function') {
      setRandomUUID(true);
    }
  }, []);

  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const adoptionData = purchase.reduce((acc, item) => {
      for (let i = item.quantity; i > 0; i--) {
        delete item.quantity;
        acc.push({
          adoptionId: randomUUID ? crypto.randomUUID() : String(Date.now() + i),
          ...item,
        });
      }
      return acc;
    }, []);

    setAdoptions((prev) => [...adoptionData, ...prev]);

    setPurchase([]);

    setLoadingSimulated(true);
    const loadingSim = setTimeout(() => {
      setLoadingSimulated(false);

      Swal.fire({
        title: '¡Correo enviado!',
        text: 'Hemos enviado un correo de confirmación de la adopción a tu dirección de email.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      clearTimeout(loadingSim);
      navigate('/success');
    }, 1000);
  };

  return (
    <div className={styles.bigAdoptionContainer}>
      <div className={styles.shoppingContainer}>
        {loadingSimulated && <Loader fullscreen={true} />}

        <div className={styles.shoppingLeft}>
          <h4>Medio de Pago</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name='cardNumber'
                control={control}
                defaultValue='1234567890'
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    id='cardNumber'
                    placeholder='Número de Tarjeta'
                    maxLength='16' // Establecer la longitud máxima del número de tarjeta
                    pattern='[0-9]*' // Solo permite dígitos
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                )}
              />
            </div>

            <div className={styles.cardData}>
              <div>
                <Controller
                  name='cardHolder'
                  control={control}
                  defaultValue='Name'
                  rules={{
                    required: true,
                    pattern: /^[A-Za-z\s]+$/, // Permite solo letras y espacios
                  }}
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='text'
                      id='cardHolder'
                      placeholder='Titular de Tarjeta'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z\s]/g,
                          '',
                        );
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name='expirationDate'
                  control={control}
                  defaultValue='12/31'
                  rules={{
                    required: true,
                    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, // Acepta formato 'mm/aa'
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='text'
                      id='expirationDate'
                      placeholder='Vencimiento mm/aa'
                      maxLength='5' // Limita la longitud a 5 caracteres
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9/]/g, ''); // Permite solo números y '/'
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name='ccv'
                  control={control}
                  defaultValue='12345678'
                  rules={{
                    required: true,
                    pattern: /^[A-Za-z0-9]{7,9}$/,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='text'
                      id='dni'
                      placeholder='DNI'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z0-9]/g,
                          '',
                        );
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name='documentType'
                  control={control}
                  render={({ field }) => (
                    <select {...field}>
                      <option value='dni'>DNI</option>
                      <option value='pasaporte'>Pasaporte</option>
                      {/* Agrega más opciones según sea necesario */}
                    </select>
                  )}
                />
              </div>
            </div>

            <button type='submit'>Confirmar Adopción</button>
          </form>
        </div>

        <div className={styles.shoppingRight}>
          <PurchaseSummary purchase={purchase} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCar;
