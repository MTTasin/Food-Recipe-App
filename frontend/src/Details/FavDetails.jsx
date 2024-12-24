import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../Context/Context";
import useFetch from "../useFetch";
import Loader from "../Components/Loader";
import { MdOutlineRemoveDone } from "react-icons/md";

export default function FavDetails() {
  const [recipeDetailsData, setrecipeDetailsData] = useState([]);
  const [fav, setFav] = useState([]);
  const params = useParams();

  const [isfavorite, setIsFavorite] = useState(true);

  const POSTLink = `http://127.0.0.1:8000/favorites/${params.id}/`;

  function handleClick() {
    // on handleclick remove the data from the database
    const data = JSON.stringify(recipeDetailsData);
    fetch(POSTLink, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
    })
    setIsFavorite(false);
  }

  const {
    response: favResponse,
    error: favError,
    loading: favLoading,
  } = useFetch(`http://127.0.0.1:8000/favorites/`);

  useEffect(() => {
    if (favResponse) {
      favResponse.forEach((element) => {
        if (element.name === recipeDetailsData.name) {
          setIsFavorite(true);
        }
      });
    }
  }, [favResponse]);

  const { response, error, loading } = useFetch(
    `http://127.0.0.1:8000/favorites/${params.id}`
  );

  useEffect(() => {
    if (response) {
      setrecipeDetailsData(response);
    }
  }, [response]);

  const {
    name,
    image,
    ingredients,
    instructions,
    prepTimeMinutes,
    cookTimeMinutes,
    difficulty,
    caloriesPerServing,
    mealType,
  } = recipeDetailsData;

  return (
    <div className="bg-slate-200 ">
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 bg-slate-400">
        <div>
          <div className="w-full flex justify-center">
            <img
              src={image}
              alt=""
              className="rounded-tr-xl rounded-bl-xl lg:w-1/2 shadow-lg shadow-blue-200"
            />
          </div>
        </div>
        <div className="mt-auto mb-auto">
          <h1 className="text-3xl text-black font-bold">{name}</h1>
          <p className="text-black font-bold mt-2">
            Meal Type: <span className="font-normal">{mealType}</span>
          </p>
          <p className="text-black font-bold mt-2">
            Difficulty: <span className="font-normal">{difficulty}</span>
          </p>
          <p className="text-black font-bold mt-2">
            Calories Per Serving:{" "}
            <span className="font-normal">{caloriesPerServing}</span>
          </p>
          <p className="text-black font-bold mt-2">
            Prep Time: <span className="font-normal">{prepTimeMinutes}</span>
          </p>
          <p className="text-black font-bold mt-2">
            Cook Time: <span className="font-normal">{cookTimeMinutes}</span>
          </p>

          {isfavorite ? (
            <div
              className="btn btn-error mt-5 flex justify-center"
              onClick={handleClick}
            >
              <span className="flex">
                <MdOutlineRemoveDone className="text-xl mb-2" />
                Remove from Favourites
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="lg:h-[40vh]">
        <p className="text-black font-bold mt-2">
          Ingredients: <span className="font-normal">{ingredients}</span>
        </p>

        <p className="text-black font-bold mt-2">
          Instructions: <span className="font-normal">{instructions}</span>
        </p>
      </div>
    </div>
  );
}
