import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="space-y-5 px-4 py-16">
      <div className="my-5">
        <label htmlFor="price" className="text-sm font-medium text-gray-700">
          Price
        </label>
        <div className="rounded-md flex items-center relative shadow-sm">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="price"
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="price" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mt-1 rounded-md shadow-sm w-full focus:ring-orange-500 border-gray-300 focus:border-orange-500"
          rows={4}
        />
      </div>
      <button className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        Go Live!
      </button>
    </div>
  );
};

export default Create;
