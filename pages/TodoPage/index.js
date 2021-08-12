import React from "react";
import { useEffect, useState } from "react";

import ItemBox from "../../Components/ItemBox";
import firebase from "../../firebase";
import "tailwindcss/tailwind.css";

export default function TodoPage() {
  const [filter, setFilter] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const todoRef = firebase.database().ref("Todo");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoItems = [];
      for (let id in todos) {
        todoItems.push({ id, ...todos[id] });
      }
      setItems(todoItems);
    });
  }, []);

  function onSubmitValue(ev) {
    const todoRef = firebase.database().ref("Todo");
    ev.preventDefault();
    const { createIssue } = ev.target.elements;

    const todo = {
      value: createIssue.value,
      checked: false,
    };

    todoRef.push(todo);
  }

  function handleOnDelete(id) {
    const todoRef = firebase.database().ref("Todo").child(id);
    todoRef.remove();
  }

  function handleCheckBox(id, checked) {
    const todoRef = firebase.database().ref("Todo").child(id);

    todoRef.update({
      checked,
    });
  }
  function handleOnClickFilter(value) {
    setFilter(value);
  }

  function handleEditItem(id, value) {
    const todoRef = firebase.database().ref("Todo").child(id);
    todoRef.update({
      value,
    });
  }

  const itemsQuantity = items.filter((item) => item.checked === false).length;

  return (
    <div className=" min-w-screen min-h-screen px-5 py-5 relative h-100 w-full flex items-center justify-center font-sans relative h-100 w-full flex items-center justify-center font-sans bg-gradient-to-r from-green-200 to-green-500">
      <div className=" grid  justify-center items-center bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg  h-100 w-full ">
        <div className="	display: flex flex-col justify-center items-center">
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
    </div>
  );
}
