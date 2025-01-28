import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Mail } from "lucide-react";
import { MailOpen } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserQueries = () => {
  const { queries, readQuery, unReadQuery, getQueries, aToken, loading } = useContext(AdminContext);

  const [searchQuery, setsearchQuery] = useState("");

  const extractDateAndTime = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const fullYear = newDate.getFullYear();

    const Hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    return `${day}/${month}/${fullYear}, ${Hours}:${minutes}:${seconds} `;
  };

  const filteredQueries = queries.filter((item) => {
    const filterQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return filterQuery;
  });

  useEffect(()=>{
    if(aToken){
      getQueries()
    }
  },[aToken])

  return  (
    loading ? (
      <LoadingSpinner/>
    ) : queries && (
      <div className="w-full max-w-4xl  m-5">
        <div className="flex max-sm:flex-col sm:justify-between">
          <p className="mb-3 text-lg font-medium">User Queries</p>
          <div className="flex  items-center px-2 max-sm:py-2 border rounded-md text-sm gap-1 text-gray-400 outline-double ">
            <div>
              <Search size={20} />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setsearchQuery(e.target.value)}
              type="text"
              placeholder="Search Queries"
              className="outline-none"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5 max-h-[80vh] overflow-y-scroll">
          {filteredQueries.reverse().map((item, index) => (
            <div className=" bg-white p-5 border rounded hover:shadow-md" key={index}>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 ">
                  <img className="w-8 rounded-full" src={item.image} />
                  <div className="text-sm">
                    <p className="font-medium ">{item.name}</p>
                    <p className=" text-gray-400">{item.email}</p>
                  </div>
                </div>
                <p className="mt-2 font-medium text-sm">{item.subject}</p>
                <p className="text-sm flex fle-wrap mt-0.5  ">{item.message}</p>
                <div className="flex items-center justify-between">
                  <p className="mt-5 text-sm text-gray-400 ">
                    {extractDateAndTime(item.date)}
                  </p>
                  <div>
                    {item.isCompleted ? (
                      <button
                        className="flex gap-1 items-center text-xs text-green-600  border  border-green-600  bg-green-50  rounded-full px-2 py-1 font-medium "
                        onClick={() => unReadQuery(item._id)}
                      >
                        <MailOpen size={16} />
                        Read
                      </button>
                    ) : (
                      <button
                        className="flex gap-1 items-center text-xs text-red-600  border  border-red-600 bg-red-50  rounded-full px-2 py-1 font-medium "
                        onClick={() => readQuery(item._id)}
                      >
                        <Mail size={16} />
                        Unread
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
    )

};

export default UserQueries;
