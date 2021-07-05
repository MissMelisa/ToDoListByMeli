import React from "react";
import { useEffect, useState } from "react";

import ItemBox from "../Components/ItemBox";
import "tailwindcss/tailwind.css";

export default function MainPage() {
  const [filter, setFilter] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("myList")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  function onSubmitValue(ev) {
    ev.preventDefault();
    const { createIssue } = ev.target.elements;
    const todo = {
      id: items.length + 1,
      value: createIssue.value,
      checked: false,
    };

    setItems([...items, todo]);
  }

  function handleOnDelete(id) {
    const newItems = items.filter((x) => x.id !== id);
    setItems(newItems);
  }

  function handleCheckBox(id) {
    // const newItems = items.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, checked: !item.checked };
    //   }
    //   return item;
    // });

    // clone the array (so it's a new one)
    const newItems = items.slice(); // [...items]

    // find the item I want to modify
    const myTodo = items.find((i) => i.id === id);

    // modify the item
    myTodo.checked = !myTodo.checked;

    // call my set state
    setItems(newItems);
  }
  function handleOnClickFilter(value) {
    setFilter(value);
  }

  function handleEditItem(id, value) {
    const newItems = [...items];
    const editItem = newItems.find((item) => item.id === id);
    editItem.value = value;

    setItems(newItems);
  }

  const itemsQuantity = items.filter((item) => item.checked === false).length;

  return (
    <div className="flex items-center bg-green-200  justify-center w-auto h-full  max-h-screen  ">
      <div className=" grid  justify-center items-center bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg  ">
        <div className="	display: flex flex-row justify-center items-center">
          <p className=" flex items-center justify-center text-7xl text-gray-500 font-mono font-extrabold ">
            ToDo
          </p>
          <img
            className="object-scale-down h-10   "
            src="https://media.istockphoto.com/vectors/green-grunge-check-ma rk-correct-answer-checking-vote-or-choice-icon-vector-id1051035264?b=1&k=6&m=1051035264&s=170667a&w=0&h=-_yVmpjBVAhsd01X9RBuTAlscyKCJoNN1vfMDo1jzpw="
          />
        </div>

        <form
          onSubmit={onSubmitValue}
          className=" grid grid-flow-row auto-rows-max md:auto-rows-min justify-center items-center max-w-sm md:max-w-lg "
        >
          <label
            htmlFor="createIssue"
            className=" w-full font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-8 md:my-8"
          >
            Create your issue
          </label>
          <input
            type="text"
            id="createIssue"
            name="createIssue"
            placeholder="What need to be done?"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </form>
        <div className="  max-h-full md:max-h-screen ">
          {items
            .filter((item) => filter === undefined || item.checked === filter)
            .map((item) => (
              <ItemBox
                handleEditItem={handleEditItem}
                id={item.id}
                checked={item.checked}
                onChange={() => handleCheckBox(item.id)}
                onClick={() => handleOnDelete(item.id)}
              >
                {item.value}
              </ItemBox>
            ))}
        </div>

        <span className="max-w-sm md:max-w-lg m-2 font-sans antialiased  text-gray-400  text-sm">
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
            className={
              "bg-green-600 hover:bg-teal-dark text-white font-bold py-2 px-4 rounded shadow m-1"
            }
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
    </div>
  );
}
