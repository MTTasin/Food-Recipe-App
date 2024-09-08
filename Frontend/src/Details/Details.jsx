import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../Context/Context";
import useFetch from "../useFetch";
import Loader from "../Components/Loader";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";

export default function Details() {
  const [recipeDetailsData, setrecipeDetailsData] = useState([]);
  const params = useParams();

  const [isfavorite, setIsFavorite] = useState(false);

  
  
  
  function handleClick() {
    localStorage.setItem(recipeDetailsData.id, JSON.stringify(recipeDetailsData));
    setIsFavorite(true);
  }
  
  useEffect(() => {
    if (localStorage.getItem(params.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [ params.id, handleClick ]);



  const { response, error, loading } = useFetch(
    `http://127.0.0.1:8000/recipes/${params.id}`
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
          <div className="btn btn-primary mt-5 flex justify-center" onClick={handleClick} >{isfavorite ? (<span className="flex"><MdDoneOutline className="text-xl mb-2"/>Added to Favourites</span>) : (<span className="flex"><MdOutlineStarPurple500 className="text-xl mb-2"/>Add to Favourites</span>)}</div>
        </div>
      </div>
      <div className="lg:h-[40vh]">

          <p className="text-black font-bold mt-2">
            Ingredients:{" "}
            <span className="font-normal">
              {ingredients}
            </span>
          </p>

          <p className="text-black font-bold mt-2">
            Instructions:{" "}
            <span className="font-normal">{instructions}</span>
          </p>
      </div>
    </div>
  );
}
