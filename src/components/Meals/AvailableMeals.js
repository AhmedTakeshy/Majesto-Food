import React, { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card/Card";

const AvailableMeals = () => {
  const [meals, setMEals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://reactmeals-d6e34-default-rtdb.firebaseio.com/meals.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await res.json();

      const loadedData = [];
      console.log(resData)
      for (let key in resData) {
        loadedData.push({
          id: key,
          title: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setMEals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  let content;

  if (error) {
    content = <p className={styles.error}>Something went wrong...</p>;
  }

  if (isLoading) {
    content = <p className={styles.p}>Loading....</p>;
  }

  if (!error && meals.length > 0) {
    const mealsData = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        title={meal.title}
        description={meal.description}
        price={meal.price}
      />
    ));
    content = mealsData;
  }

  return (
    <>
      <div className={styles.meals}>
        <Card>
          <ul>{content}</ul>
        </Card>
      </div>
    </>
  );
};

export default AvailableMeals;
