"use client";
import { useEffect, useState } from "react";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch("http://localhost:4000/job");
      const data = await response.json();
      setJobs(data);
    }

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-md p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
