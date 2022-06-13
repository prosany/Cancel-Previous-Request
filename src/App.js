import React from "react";
import axios from "axios";
import "./App.scss";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Pbar from "./components/pbar";

const App = () => {
  const [data, setData] = React.useState(null);
  const [data1, setData1] = React.useState(null);

  let cancelToken;
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    if (cancelToken) {
      cancelToken.cancel("Operations cancelled due to new request");
    }
    cancelToken = axios.CancelToken.source();
    let results;
    try {
      results = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + value,
        {
          cancelToken: cancelToken.token,
        }
      );
    } catch (error) {
      console.log(error);
    }
    if (results.data.meals) {
      setData(results.data.meals);
    } else {
      setData(null);
    }
  };

  const callAPI = () => {
    axios
      .get("https://ip-address-total-hit.herokuapp.com/uri")
      .then((res) => {
        console.log(res);
        setData1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [dates, setDates] = React.useState([]);
  const changeDate = (e) => {
    console.log("📌 | changeDate | e", e);
    setDates([...dates]);
  };

  const disableCustomDt = (current) => {
    return !dates.includes(current.format("YYYY-MM-DD"));
  };

  return (
    <React.Fragment>
      <Pbar />
      <div className="full-body">
        Data: {data1}
        <h2>Search for Recipes</h2>
        <DatePicker
          timeFormat={false}
          isValidDate={disableCustomDt}
          onChange={changeDate}
        />
        <p>Cancel Previous API Call</p>
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search Recipes..."
        />
        {data && (
          <div className="meal-container">
            {data.map((meal, idx) => (
              <div className="meal" key={idx}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>
                  Recipe Name: <strong>{meal.strMeal}</strong>
                </p>
                <p>Category: {meal.strCategory}</p>
              </div>
            ))}
          </div>
        )}
        <button onClick={callAPI}>Call API</button>
      </div>
    </React.Fragment>
  );
};

export default App;
