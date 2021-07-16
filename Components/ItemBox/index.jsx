import { useState } from "react";

import PropTypes from "prop-types";

import { classnames } from "tailwindcss-classnames";

function ItemBox({ text, onChange, checked, id, handleEditItem, onClick }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  function handleOnClickEdit() {
    setEdit(true);
  }

  function handleSave() {
    setEdit(false);
    handleEditItem(id, value);
  }

  return (
    <div className="shadow appearance-none border rounded  text-grey-darker  cursor-pointer w-auto h-auto   font-sans  display: flex align-center  justify-between  m-1">
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
            "w-auto font-sans  antialiased text-xl  md:my-5 self-center ",
            {
              ["line-through text-gray-400"]: checked === true,
            }
          )}
        >
          {text}
        </p>
      )}
      <div className="display: flex items-center justify-end flex-col-reverse">
        {edit === false ? (
          <span
            className="font-sans  text-gray-400  text-sm   m-4"
            onClick={handleOnClickEdit}
            handleEditItem={handleEditItem}
          >
            Edit
          </span>
        ) : (
          <div>
            <span
              onClick={handleSave}
              className="font-sans  text-gray-400  text-sm   m-4"
            >
              Save
            </span>
          </div>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>

        {/* <Exit
        
          onClick={onClick}
          className="h-6 w-6 self-start m-2 fill-current"
          width={100}
          height={100}
          fill={"red"}
        /> */}
      </div>
    </div>
  );
}
ItemBox.PropTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.number.isRequired,
  handleEditItem: PropTypes.func,
  onClick: PropTypes.func.isRequired,
};

export default ItemBox;
