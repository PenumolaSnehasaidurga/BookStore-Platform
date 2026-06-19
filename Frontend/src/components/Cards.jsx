import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  // Pull in the authUser state to check if someone is logged in
  const [authUser] = useAuth();

  // Function to run if a logged-out user tries to click Buy Now
  const handleNotLoggedIn = () => {
    toast.error("Please log in to buy books!");
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between items-center mt-4">
              <div className="badge badge-outline">₹{item.price}</div>

              {/* CONDITIONAL RENDER: Check if authUser exists */}
              {authUser ? (
                // 🟢 If user IS logged in: Show the normal working Amazon link
                <a
                  href={item.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-3 py-1 rounded-full border-[2px] border-pink-500 hover:bg-pink-500 hover:text-white duration-200"
                >
                  Buy Now
                </a>
              ) : (
                // 🔴 If user is NOT logged in: Show a disabled button with an alert
                <button
                  onClick={handleNotLoggedIn}
                  className="cursor-not-allowed opacity-60 px-3 py-1 rounded-full border-[2px] bg-gray-200 text-gray-500 hover:bg-gray-300 duration-200"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
