import LocationsItemLink from '../../../../components/locations-item-link/locations-item-link';
import {
  CityProps,
  CityKeys,
  CurrentCityChangeType,
} from '../../../../types/types';

function LocationsItem(
  props: CityProps & {
    currentCity: CityKeys;
    onCurrentCityChange: CurrentCityChangeType;
  }
): JSX.Element {
  const { city, currentCity, onCurrentCityChange, typesPage } = props;

  return (
    <li onClick={() => onCurrentCityChange(city)} className="locations__item">
      <LocationsItemLink
        city={city}
        typesPage={typesPage}
        isActive={city === currentCity}
      />
    </li>
  );
}

export { LocationsItem };
