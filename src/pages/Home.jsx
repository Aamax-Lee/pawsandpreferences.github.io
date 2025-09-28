import {
  Deck,
  DeckCards,
  DeckItem,
  DeckEmpty,
} from "@/components/ui/kibo-ui/deck/index";
import { getCatsId, getRandomCats } from "../services/cataas-api";
import { useState, useEffect } from "react";
import LoadingStatus from "@/components/LoadingStatus";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { useCatContext } from "@/contexts/CatContext";
import { useNavigate } from "react-router-dom";
// import Image from "next/image";

function Home() {
  const navigate = useNavigate();
  const {
    isFavourite,
    addToFavourites,
    removeFromFavourites,
    catsScrolled,
    addToScrolled,
  } = useCatContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("left");

  const [searchQuery, setSearchQuery] = useState("");

  const [cats, setCats] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      if (reset) {
        setCurrentIndex(0);
        setCats([]);
      }

      const cats = await getRandomCats();
      setCats(cats);
    } catch (error) {
      setError("failed to load cats.");
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
      console.log("Fetch attempt finished.");
    }
  };

  function loadMoreCats() {
    fetchCats(true);
  }

  const nextCardLeft = () => {
    if (currentIndex < cats.length) {
      onLike(cats[currentIndex]);

      setAnimationDirection("left");
      // Small delay to ensure direction is set before index changes
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        addToScrolled();
      }, 0);
    }
  };

  const nextCardRight = () => {
    if (currentIndex < cats.length) {
      setAnimationDirection("right");
      // Small delay to ensure direction is set before index changes
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        addToScrolled();
      }, 0);
    }
  };

  function onLike(cat) {
    console.log(`Favourite clicked for cat: ${cat.id}`);
    if (isFavourite(cat.id)) return;
    addToFavourites(cat);
  }

  const handleSwipe = (index, direction) => {
    console.log(`Cat ${cats[index].id} swiped ${direction}`);
    if (direction === "left") {
      onLike(cats[index]);
    }
  };

  const handleSwipeEnd = (index, direction) => {
    console.log(`Swipe finished for cat ${cats[index].id} to ${direction}`);
  };

  if (loading) {
    return <LoadingStatus />;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-between h-[calc(100vh-96px)] sm:justify-start sm:pt-10">
      {/* CARDS */}
      <Deck className="mx-auto w-full max-w-[500px]  flex-grow sm:flex-grow-0 aspect-[3/4] sm:aspect-[4/5] rounded-t-xl">
        <DeckCards
          animateOnIndexChange={true}
          className="aspect-[4/5]  rounded-t-xl"
          currentIndex={currentIndex}
          indexChangeDirection={animationDirection}
          onCurrentIndexChange={setCurrentIndex}
          onSwipe={(_index, direction) => {
            console.log(`Swiped cat index ${_index} to ${direction}`);
            setAnimationDirection(direction);
            addToScrolled();
            if (direction === "left") {
              onLike(cats[_index]);
            }
            // console.log(JSON.stringify(isFavourite(cats[_index])));
          }}
        >
          {cats.map((cat) => (
            <DeckItem
              key={cat.id}
              className="relative shadow-lg overflow-hidden bg-gray-900 rounded-t-xl "
            >
              {/* <div className=""> */}
              <img
                src={`https://cataas.com/cat/${cat.id}?width=400&height=400`}
                alt="Loading Your Cat..."
                className="w-full h-full object-cover justify-center text-gray-200 rounded-t-xl"
                draggable={false}
              />

              {cat.tags?.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs sm:text-sm px-3 py-2 flex flex-wrap gap-2">
                  {cat.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-white text-black px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* </div> */}
            </DeckItem>
          ))}
        </DeckCards>
        <DeckEmpty>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-gray-300">No more cats</p>

            <div className="flex gap-6">
              {/* Redirect to Favourites */}
              <button
                onClick={() => navigate("/favourites")}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
              >
                View Favourites
              </button>

              {/* Load More Cats */}
              <button
                onClick={loadMoreCats}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Load More
              </button>
            </div>
          </div>
        </DeckEmpty>
      </Deck>

      {/* Bottom Controls */}
      {/*  sm:w-60 md:w-80 */}
      <div className="mx-auto w-full max-w-[500px] ">
        <div
          className="bg-[rgba(255,255,255,0.05)] text-white rounded-b-xl shadow-md p-4 flex flex-col items-center gap-3"
          style={{
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
            // clipPath: "inset(0 round 0 0 0 0)",
          }}
        >
          {/* Swipe Count */}
          <p className="text-xl text-gray-300">
            Cats Swiped: <span className="font-semibold">{catsScrolled}</span>
          </p>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex justify-center gap-20">
            <button
              disabled={currentIndex >= cats.length}
              onClick={nextCardLeft}
              className="h-20 w-20 rounded-full bg-green-500/20 hover:bg-green-500 flex items-center justify-center shadow-lg"
            >
              <Heart className="h-12 w-12 text-pink-500" />
            </button>

            <button
              disabled={currentIndex >= cats.length}
              onClick={nextCardRight}
              className="h-20 w-20 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center shadow-lg"
            >
              <X className="h-12 w-12 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
