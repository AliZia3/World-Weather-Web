import React, { useState } from "react";
import { search } from "../assets";

const SearchBar = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleInputChange = (event) => {
		setSearchInput(event.target.value);
	};

	const handleSearch = () => {
		onSearch(searchInput);
		setSearchInput("");
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="flex justify-center items-center gap-2">
			<input
				type="text"
				className="text-sm lg:text-lg bg-opacity-60 bg-gray-700 text-white h-12 px-6 rounded-full"
				placeholder="Search"
				value={searchInput}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
			/>
			<button className="search-btn bg-opacity-60 bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center lg:my-2" onClick={handleSearch}>
				<img
					src = {search}
					alt="Search Button"
					className="w-6 h-6 lg:w-8 lg:h-8 flex justify-center items-center"
				/>
			</button>
		</div>
	);
};

export default SearchBar;
