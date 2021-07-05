import { useState } from "react";
import { classnames } from "tailwindcss-classnames";

function ItemBox({ onClick, children, onChange, checked, id, handleEditItem }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(children);

  function handleOnClickEdit() {
    setEdit(true);
  }

  function handleSave() {
    setEdit(false);
    handleEditItem(id, value);
  }

  return (
    <div className="  rounded overflow-hidden shadow-lg cursor-pointer  font-sans antialiased display: flex align-center  justify-between  m-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        className="self-center ml-1"
      />
      {edit === true ? (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <p
          className={classnames(
            "w-auto font-sans  antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-5 md:my-5 self-center ",
            {
              ["line-through text-gray-400"]: checked === true,
            }
          )}
        >
          {children}
        </p>
      )}
      <div className="display: flex items-center justify-end flex-col-reverse">
        {edit === false ? (
          <span
            className="font-sans  text-gray-400  text-sm  "
            onClick={handleOnClickEdit}
            handleEditItem={handleEditItem}
          >
            Edit
          </span>
        ) : (
          <div>
            <span onClick={handleSave}>Save</span>
          </div>
        )}
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 self-start m-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}

export default ItemBox;
