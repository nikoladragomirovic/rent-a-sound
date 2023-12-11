import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Link } from "react-router-dom";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/data";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const formatDate = (date) => {
    if (!date || !date.from) {
      return [];
    }

    const fromDate = new Date(date.from);

    if (isNaN(fromDate)) {
      return [];
    }

    if (!date.to) {
      return [format(fromDate, "dd-MM-yyyy")];
    }

    const toDate = new Date(date.to);

    if (isNaN(toDate)) {
      return [];
    }

    const dateList = [];

    for (
      let currentDate = fromDate;
      currentDate <= toDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      dateList.push(format(currentDate, "dd-MM-yyyy"));
    }

    return dateList;
  };

  const calculatePrice = (model, dateRange) => {
    const priceMap = {
      "JBL PartyBox 100": {
        0: 1500,
        1: 1500,
        2: 1500,
        3: 1500,
        4: 1800,
        5: 2000,
        6: 2200,
      },
      "JBL PartyBox 310": {
        0: 2000,
        1: 2000,
        2: 2000,
        3: 2000,
        4: 2300,
        5: 2500,
        6: 2700,
      },
      "JBL PartyBox 110": {
        0: 1200,
        1: 1200,
        2: 1200,
        3: 1200,
        4: 1500,
        5: 1700,
        6: 1900,
      },
    };

    return dateRange.length > 6
      ? priceMap[model][6] + 500 * (dateRange.length - 6)
      : priceMap[model][dateRange.length];
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-start font-montserrat">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
        className="text-neutral-200 bg-neutral-800 p-8 rounded-3xl"
        styles={{
          caption: {
            backgroundColor: "RGB(29,29,29)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          },
        }}
      />
      {data &&
        data.map((item) => {
          {
            const unavailableDates = item.unavailable || [];

            const dates = formatDate(selected);

            const isDateUnavailable = formatDate(selected).some((date) =>
              unavailableDates.includes(date)
            );
            if (
              !isDateUnavailable &&
              item.city === location.pathname.replace("/katalog/", "")
            )
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-start bg-neutral-800 md:w-1/3 w-3/4 m-5 rounded-3xl"
                >
                  <h1 className="m-3 mt-6 text-3xl font-bold text-white tracking-wider">
                    {item.name}
                  </h1>
                  <p className="font-thin text-white text-xl m-3">
                    {item.desc}
                  </p>
                  <img src={item.image} alt={item.name} />
                  <p className="text-purple-400 font-bold tracking-wider text-3xl">
                    {calculatePrice(item.name, dates) + "din."}
                  </p>
                  <Link
                    to={
                      "/rez/" +
                      item.id +
                      "/" +
                      dates[0] +
                      "-to-" +
                      dates[dates.length - 1]
                    }
                    className="mb-6 m-3 px-5 py-2 text-white font-bold tracking-wider text-xl bg-[rgb(29,29,29)] rounded-md"
                  >
                    REZERVIŠI
                  </Link>
                </div>
              );
          }
        })}
    </div>
  );
};

export default Catalogue;
