import React from "react";

const WeatherInfo = ({
	feelsLike,
	description,
	humidity,
	pressure,
	windSpeed,
	sunrise,
	sunset,
}) => {
	const formatTime = (time) => {
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		return `${formattedHours}:${formattedMinutes}`;
	};

	return (
		<div className="w-56">
			<div className="flex justify-between text-md my-0 sm:my-4">
				<div>Feels Like (°C): </div>
				<div>{feelsLike}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Description:</div>
				<div>{description}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Humidity (%):</div>
				<div>{humidity}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Pressure:</div>
				<div>{pressure}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Wind Speed (km/h):</div>
				<div>{windSpeed}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Sunrise (am):</div>
				<div>{sunrise && formatTime(new Date(sunrise * 1000))}</div>
			</div>
			<div className="flex justify-between text-md my-1 sm:my-4">
				<div>Sunset (pm):</div>
				<div>{sunset && formatTime(new Date(sunset * 1000))}</div>
			</div>
		</div>
	);
};

export default WeatherInfo;
