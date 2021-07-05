function ItemBox({ onClick, children, onChange, checked, id }) {
  return (
    <div className=" border border-600 md:box-content cursor-pointer  font-sans antialiased display: flex align-center  justify-between bg-scroll  md:max-h-30 h-30  overflow-x-auto ">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        className="self-center ml-1"
      />
      {checked === false ? (
        <p className=" w-auto font-sans  antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-5 md:my-5 self-center ">
          {children}
        </p>
      ) : (
        <p className=" w-auto font-sans antialiased text-xl font-medium sm:subpixel-antialiased md:antialiased mt-5 md:my-5 self-center line-through text-gray-400">
          {children}
        </p>
      )}

      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 self-start"
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
  );
}

export default ItemBox;
