import React from "react";
import { useEffect, useState } from "react";
import ItemBox from "../../Components/ItemBox";
import { todos } from "../../firebase";
import "tailwindcss/tailwind.css";
import { useAuth } from "../authUserContext/authUserContext";

export default function TodoPage() {
  const [filter, setFilter] = useState();
  const [items, setItems] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    // const todoRef = firebase.database().ref("Todo");
    const userId = authUser.uid;
    const thisUser = todos.child(userId);

    thisUser.on("value", (snapshot) => {
      const lists = snapshot.val();
      const todoItems = [];
      for (let id in lists) {
        todoItems.push({ id, ...lists[id] });
      }
      setItems(todoItems);
    });
  }, []);

  function onSubmitValue(ev) {
    ev.preventDefault();
    const userId = authUser.uid;
    const thisUser = todos.child(userId);

    const { createIssue } = ev.target.elements;

    const todo = {
      value: createIssue.value,
      checked: false,
    };

    thisUser.push(todo);
  }

  function handleOnDelete(id) {
    const userId = authUser.uid;
    const thisUser = todos.child(userId);
    const itemsList = [...items];
    const newListItems = itemsList.filter((item) => item.id !== id);
    thisUser.set(newListItems);
  }

  function handleCheckBox(id, checked) {
    const userId = authUser.uid;
    const thisUser = todos.child(userId);
    const itemsList = [...items];
    const newCheckList = itemsList.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        item.checked = checked;
        return item;
      }
    });
    thisUser.set(newCheckList);
  }
  function handleOnClickFilter(value) {
    setFilter(value);
  }

  function handleEditItem(id, value) {
    const userId = authUser.uid;
    const thisUser = todos.child(userId);
    const itemsList = [...items];
    const newEditItem = itemsList.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        item.value = value;
        return item;
      }
    });
    thisUser.set(newEditItem);
  }

  const itemsQuantity = items.filter((item) => item.checked === false).length;

  return (
    <div className="items-center justify-center grid  justify-center items-center bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg  h-100 w-full ">
      <form
        onSubmit={onSubmitValue}
        className=" grid grid-flow-row auto-rows-max md:auto-rows-min justify-center items-center max-w-sm md:max-w-lg "
      >
        <label
          htmlFor="createIssue"
          className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
        >
          Create your task
        </label>
        <input
          type="text"
          id="createIssue"
          name="createIssue"
          placeholder="What need to be done? "
          className=" shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:bg-white "
        />
      </form>
      <div className="  d:max-h-screen  p-8">
        {items
          .filter((item) => filter === undefined || item.checked === filter)
          .map((item, index) => (
            <ItemBox
              key={index}
              onEditItem={handleEditItem}
              id={item.id}
              checked={item.checked}
              onChange={() => handleCheckBox(item.id, !item.checked)}
              onClick={() => handleOnDelete(item.id)}
              text={item.value}
            />
          ))}
      </div>

      <span className="max-w-sm md:max-w-lg m-2 font-sans antialiased  text-gray-400  text-sm ">
        {itemsQuantity} items left
      </span>

      <div className="inline-flex">
        <button
          className={
            "bg-green-600 hover:bg-teal-dark  text-white font-bold py-2 px-2 rounded  shadow m-1"
          }
          onClick={() => handleOnClickFilter()}
        >
          All
        </button>
        <button
          className="bg-green-600 hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow m-1"
          onClick={() => handleOnClickFilter(true)}
        >
          Completed
        </button>
        <button
          className={
            "bg-green-600 hover:bg-teal-dark text-white font-bold py-2 px-4 rounded  shadow m-1"
          }
          onClick={() => handleOnClickFilter(false)}
        >
          Active
        </button>
      </div>
    </div>
  );
}
