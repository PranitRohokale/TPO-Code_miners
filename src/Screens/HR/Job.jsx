import React from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/hrSidebar/Sidebar";

const Job = () => {
  const { jobId } = useParams();

  console.log(jobId);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <div class="container my-12 px-6 mx-auto">
          <section class="mb-2 text-gray-800 text-center md:text-left">
            <div class="block rounded-lg shadow-lg bg-white">
              <div class="flex flex-wrap items-center">
                <div class="grow-0 shrink-0 basis-auto w-full md:w-12/12">
                  <div class="px-2 py-4 md:px-12">
                    <h2 class="text-3xl font-bold mb-6">
                      <span class="text-red-600">"Spicy life"</span> project
                    </h2>
                    <p class="text-gray-500 mb-6 pb-2">
                      Nunc tincidunt vulputate elit. Mauris varius purus
                      malesuada neque iaculis malesuada. Aenean gravida magna
                      orci, non efficitur est porta id. Donec magna diam.
                    </p>
                    <button
                      type="button"
                      class="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="m-2  my-5 text-gray-800 text-center md:text-left">
            <div class="flex space-x-5  space-around">
              <Link to={`/hr/createdjobs/${jobId}/applicantList`}>
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Applicant List
                </button>
              </Link>

              {[1, 2, 3].map((roundId, index) => {
                return (
                  <Link key={index} to={`/hr/createdjobs/${jobId}/${roundId}`}>
                    <button
                      type="button"
                      class="inline-block px-6 py-2.5 bg-purple-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Round : {index}
                    </button>
                  </Link>
                );
              })}

              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              >
                Total Roundes : 0
              </button>

              {/* </div> */}
            </div>
          </section>
          <section class="mb-2 text-gray-800 text-center md:text-left">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Job;
