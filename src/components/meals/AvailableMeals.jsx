import classes from "./AvailableMeals.module.css";
import MealItem from "./meal-item/MealItem";
import { useEffect, useState } from "react";
import domyImage from "../../assets/images/test.png";
import Spinner from "../UI/Spinner";
import MessageModal from "../UI/MessageModal";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchmeals = async () => {
      const response = await fetch(
        "https://react-movies-aadfb-default-rtdb.firebaseio.com/meals.json",
        { method: "GET", "Content-Type": "Application/json" }
      );
      const responseData = await response.json();
      if (!response.ok) {
       throw new Error("Faild to fetch list of meals");
      }
      let dataArray = [];

      for (let key in responseData) {
        dataArray.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          src: responseData[key].src ? responseData[key].src : domyImage,
        });
      }
      setMeals(dataArray);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    };

    // try fetching the request or catch an error is not gonna work because the function is async func
    // try {
    //   fetchmeals();
    // } catch (error) {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 1000);
    //   setHttpError(error.message);
    //   console.log('error', error);
    // }
    fetchmeals().catch((error) => {
      setHttpError(error.message);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }
  if (httpError !== "") {
    return <MessageModal>{httpError}</MessageModal>;
  }

  const MealsList = meals.map((item) => (
    <MealItem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      currency="$"
      imgSrc={item.src}
    />
  ));
  return (
    <section className={classes.meals}>
      <ul className={classes.mealsList}>{MealsList}</ul>
    </section>
  );
};
export default AvailableMeals;
