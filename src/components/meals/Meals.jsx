import AvailableMeals from "./AvailableMeals";
import classes from "./Meals.module.css";
import MealsSummary from "./MealsSummary";
const Meals = () => {
  return (
    <div className={classes.mainBody}>
      <div className="row">
        <div className="col-12 col-md-6">
          <MealsSummary />
        </div>
        <div className="col-12 col-md-6">
          <img src="" alt="" />
        </div>
      </div>
      <AvailableMeals />
    </div>
  );
};
export default Meals;
