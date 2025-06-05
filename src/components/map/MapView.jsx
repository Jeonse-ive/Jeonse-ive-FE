import NoiseMap from './NoiseMap';
import FraudMap from './FraudMap';

const MapView = ({ city, mapType }) => {
  return (
    <div
      style={{
        width: '90%',
        height: '70vh',
        margin: '2rem auto',
        border: '2px solid #6495ed',
        backgroundColor: '#e0e0e0',
      }}
    >
      {mapType === 'noise' && <NoiseMap city={city} />}
      {mapType === 'fraud' && <FraudMap city={city} />}
    </div>
  );
};

export default MapView;
