import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        className="mt-1 rounded-md shadow-sm w-full focus:ring-orange-500 border-gray-300 focus:border-orange-500"
        rows={4}
        placeholder="Ask a question!"
      />
      <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
        Submit
      </button>
    </form>
  );
};

export default Write;