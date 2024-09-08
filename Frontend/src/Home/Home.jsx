import { useState, useEffect, useContext } from "react";
import useFetch from "../useFetch";
import Loader from "../Components/Loader";
import { RecipeContext } from "../Context/Context";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const { searchParams, setSearchParams } = useContext(RecipeContext);


  // const { response, error, loading } = useFetch(
  //   searchParams
  //     ? `https://dummyjson.com/recipes/search?q=${searchParams}`
  //     : `https://dummyjson.com/recipes?limit=${limit}`
  // );

  const { response, error, loading } = useFetch(
    searchParams
      ? `http://127.0.0.1:8000/recipes/?name=${searchParams}`
      : `http://127.0.0.1:8000/recipes/?limit=${limit}`
  );

  

  useEffect(() => {
    if (response) {
      setData(response);
    }
  }, [response]);

  const recipe = data.map((recipe) => {
    return (
      <div
        key={recipe.id}
        className="card bg-base-100 image-full w-96 shadow-xl my-3"
      >
        <figure className="h-52">
          <img src={recipe.image} alt={recipe.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{recipe.name}</h2>
          <p>Meal type: {recipe.mealType}</p>
          <div className="card-actions justify-end">
            <Link to={`/Details/Details.jsx/${recipe.id}`}><button className="btn btn-primary">Details</button></Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-4 ">{recipe}</div>
      {loading && <Loader />}
      {error && <p>Not found</p>}
      <div className="flex justify-center">
        {loading || searchParams ? null : (
          <button
            onClick={() => setLimit(limit + 10)}
            className="btn btn-outline btn-primary rounded-full w-[80vw]"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
