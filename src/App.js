import React from "react";
import axios from "axios";
import "./App.scss";

const App = () => {
  const [data, setData] = React.useState(null);

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

  return (
    <React.Fragment>
      <div className="full-body">
        <h2>Search for Recipes</h2>
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
      </div>
    </React.Fragment>
  );
};

export default App;
