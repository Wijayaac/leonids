import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={`${className} mt-1 relative rounded-md shadow-sm`}>
      <input
        type="text"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md"
        placeholder="Search Article"
        id=""
        aria-label="search article"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search SearchIcon"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </form>
  )
)
