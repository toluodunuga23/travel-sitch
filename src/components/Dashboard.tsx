"use client";

import { breakFastShops } from "../helper/data";
import { coffeeShops } from "../helper/data";
import { events } from "../helper/data";
import { Input } from "./ui/input";
import { trpcApp } from "@/utils/trpcApp";
import Image from "next/image";
import { increment, setValue } from "@/lib/features/counter/counterSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
export const Dashboard = () => {
  const hello = trpcApp.hello.useQuery({ name: "Tolu" });
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  if (!hello.data) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Header />
      <div className="flex flex-col items-start justify-start ml-70 mt-10 ">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-2xl bold ">
              Good Morning, {hello.data.greeting} 👋
            </h1>
            {/* <h1>Count: {count}</h1> */}
            <p className="text-gray-500 mt-3">
              Here's what's going on in the city
            </p>
            {/* <button onClick={() => dispatch(increment())}>Increment</button> */}
          </div>
          {/* <div className="flex justify-end w-65 mr-12">
            <div className="mt-6 w-65">
              <Input placeholder="Search" className="border-2 border-black" />
            </div>
          </div> */}
        </div>
        <h2 className="text-2xl bold mt-10">🎤 Events Today</h2>
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow-md w-65 border-2 border-black"
            >
              <h3 className="text-lg bold text-black">{event.name}</h3>
              <p className="text-gray-500 mt-3">📍{event.location}</p>
              <p className="text-gray-500 mt-3">{event.price}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl bold mt-10">🥐 Breakfast Shops in Manhattan</h2>
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">
          {breakFastShops.map((breakFastShop) => (
            <div
              key={breakFastShop.id}
              className="bg-white p-4 rounded-lg shadow-md w-65 border-2 border-black"
            >
              <Image
                src={breakFastShop.img}
                alt={breakFastShop.name}
                width={300}
                height={300}
                className="object-cover w-56 h-35 rounded-lg"
              />
              <h3 className="text-lg bold text-black">{breakFastShop.name}</h3>
              <p className="text-gray-500 mt-3">📍{breakFastShop.location}</p>
              <p className="text-gray-500 mt-3">{breakFastShop.priceRange}</p>
              <p className="text-gray-500 mt-3">{breakFastShop.reviews}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl bold mt-10">
          📈 Trending Coffee Shops in Manhattan
        </h2>
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">
          {coffeeShops.map((coffeeShop) => (
            <div
              key={coffeeShop.id}
              className="bg-white p-4 rounded-lg shadow-md w-65 border-2 border-black"
            >
              <Image
                src={coffeeShop.img}
                alt={coffeeShop.name}
                width={300}
                height={300}
                className="object-cover w-56 h-35 rounded-lg"
              />
              <h3 className="text-lg bold text-black">{coffeeShop.name}</h3>
              <p className="text-gray-500 mt-3">📍{coffeeShop.location}</p>
              <p className="text-gray-500 mt-3">{coffeeShop.priceRange}</p>
              <p className="text-gray-500 mt-3">{coffeeShop.reviews}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
