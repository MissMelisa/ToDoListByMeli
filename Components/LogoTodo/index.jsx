export default function LogoTodo() {
  return (
    <div className="	display: flex flex-col justify-center items-center">
      <p className=" flex items-center justify-center text-7xl text-gray-500 font-mono font-extrabold ">
        ToDo
      </p>
      <div className="display: flex  justify-center items-center   text-gray-500  ">
        <p>By Meli</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
