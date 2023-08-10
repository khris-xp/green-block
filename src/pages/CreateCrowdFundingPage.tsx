import { IProjectForm } from "@/interfaces/project";
import { projectService } from "@/services/projects.services";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const CreateCrowdFundingPage = () => {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [project, setProject] = useState<IProjectForm>({
    name: "",
    description: "",
    image: "",
    start_date: "",
    end_date: "",
    max_shares: 0,
    contact: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    estimated_outcome: 0,
  });

  const handleChangeDateValue = (newDateValue: DateValueType) => {
    setDateValue(newDateValue);
    const startDateValue = newDateValue?.startDate
      ? newDateValue.startDate.toString()
      : "";
    const endDateValue = newDateValue?.endDate
      ? newDateValue.endDate.toString()
      : "";
    setProject({
      ...project,
      start_date: startDateValue,
      end_date: endDateValue,
    });
  };

  const handleCreateOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.createProject(project);
      setProject({
        name: "",
        description: "",
        image: "",
        start_date: "",
        end_date: "",
        max_shares: 0,
        contact: {
          name: "",
          email: "",
          phoneNumber: "",
        },
        estimated_outcome: 0,
      });

      setDateValue({
        startDate: null,
        endDate: null,
      })
    } catch (error) {
      const message = (error as Error).message;
      throw new Error(message);
    }
  };

  return (
    <div className="container mx-auto lg:max-w-screen-xl p-4 font-BAI">
      <div className="max-w-xl bg-white mx-auto p-6 rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-medium mb-6">
          Create Project
        </h1>
        <form onSubmit={handleCreateOffer}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Project name
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Project name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Project description
            </label>
            <textarea
              placeholder="Project description"
              cols={30}
              rows={7}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Project image
            </label>
            <input
              type="text"
              id="projectImage"
              placeholder="Project image"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={project.image}
              onChange={(e) =>
                setProject({ ...project, image: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="">
              <label className="block font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <Datepicker
                useRange={false}
                value={dateValue}
                onChange={handleChangeDateValue}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Maximum Offer
              </label>
              <input
                type="number"
                id="maximumOffer"
                placeholder="Maximum Offer"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
                value={project.max_shares}
                onChange={(e) =>
                  setProject({ ...project, max_shares: e.target.valueAsNumber })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="">
              <label className="block font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                id="contacttName"
                placeholder="contact Name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
                value={project.contact.name}
                onChange={(e) =>
                  setProject({
                    ...project,
                    contact: { ...project.contact, name: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <label className="">
                Estimated Outcome in retail(s)CC
              </label>
              <input
                type="number"
                id="estimatedOutcome"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
                value={project.estimated_outcome}
                onChange={(e) =>
                  setProject({
                    ...project,
                    estimated_outcome: e.target.valueAsNumber,
                  })
                }
                required
              />
            </div>
            <div className="">
              <label className="block font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="text"
                id="contactEmail"
                placeholder="contact Email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
                value={project.contact.email}
                onChange={(e) =>
                  setProject({
                    ...project,
                    contact: { ...project.contact, email: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Contact Phone
              </label>
              <input
                type="text"
                id="contactPhone"
                placeholder="contact Phone"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-green-500"
                value={project.contact.phoneNumber}
                onChange={(e) =>
                  setProject({
                    ...project,
                    contact: { ...project.contact, phoneNumber: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-primary-color text-white font-medium px-16 rounded-lg py-2 hover:bg-opacity-90"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCrowdFundingPage;
