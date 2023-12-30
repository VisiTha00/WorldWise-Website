import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

function CountryList() {
  const { cities, isLoading } = useCity();
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const newFilteredCountries = cities.reduce((acc, city) => {
      if (!acc.some((item) => item.country === city.country)) {
        acc.push({ country: city.country, emoji: city.emoji });
      }
      return acc;
    }, []);
    setFilteredCountries(newFilteredCountries);
  }, [cities]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message={"Add your first city by clicking on the map"} />;
  }

  return (
    <ul className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
