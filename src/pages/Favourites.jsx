import { useCatContext } from "../contexts/CatContext";
import { Heart, GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  //   DragStartEvent,
  //   DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useState, useEffect, useCallback, FC } from "react";
import SortableItem from "../components/SortableItem";

function Favourites() {
  const { favourites, removeFromFavourites, reorderFavourites } =
    useCatContext();
  const [items, setItems] = useState(favourites.map((cat) => cat.id));
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setItems(favourites.map((cat) => cat.id));
  }, [favourites]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      const reorderedCats = newItems.map((id) =>
        favourites.find((cat) => cat.id === id)
      );
      reorderFavourites(reorderedCats);
    }
  };

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  if (favourites.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-400">
        No favourite cats yet...
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-lg text-gray-400 font-semibold mb-4 mt-4">
        You have {favourites.length} cat{favourites.length !== 1 ? "s" : ""}{" "}
        favourited! 🐱
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {/* <Grid columns={3}> */}
            {items.map((id) => {
              const cat = favourites.find((c) => c.id === id);
              return (
                <SortableItem key={cat.id} id={cat.id}>
                  {(listeners) => (
                    <div className="relative bg-gray-800 rounded-lg shadow-md aspect-[4/5] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 active:scale-110">
                      {/* Drag handle */}
                      <div
                        {...listeners}
                        className="absolute bottom-2 left-2 bg-black/40 p-1 rounded-full cursor-grab active:cursor-grabbing z-20"
                      >
                        <GripVertical className="h-5 w-5 text-gray-300" />
                      </div>

                      <img
                        src={`https://cataas.com/cat/${cat.id}?width=400&height=400`}
                        alt="Favourite Cat"
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => {
                          removeFromFavourites(cat.id);
                          setItems((prev) =>
                            prev.filter((id) => id !== cat.id)
                          );
                        }}
                        className="absolute top-2 right-2 bg-black/40 p-1 rounded-full z-30"
                      >
                        <Heart className="h-8 w-8 text-pink-500 fill-current" />
                      </button>
                    </div>
                  )}
                </SortableItem>
              );
            })}
            {/* </Grid> */}
          </div>
          {/* <div className="p-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favourites.map((cat) => (
            <div
              key={cat.id}
              className="relative bg-gray-800 rounded-lg shadow-md aspect-[4/5] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 active:scale-110"
            >
              <img
                src={`https://cataas.com/cat/${cat.id}?width=400&height=400`}
                alt="Favourite Cat"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFromFavourites(cat.id)}
                className="absolute top-2 right-2 bg-black/40 p-1 rounded-full"
              >
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
              </button>
            </div>
          ))}
        </div> */}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Favourites;
