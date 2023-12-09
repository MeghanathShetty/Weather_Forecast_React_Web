import { BsFillCloudSlashFill  } from 'react-icons/bs';

export const toastErrorStyle = () => {
  return {
    position: 'top-center',
    autoClose: 3300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: '#ff4d4f',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: <BsFillCloudSlashFill />,
  };
};