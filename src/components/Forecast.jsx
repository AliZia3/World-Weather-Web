import React from "react";

const Forecast = ({ dailyForecast }) => {
	return (
		<div className="future-forecast bg-opacity-70 bg-black text-white flex justify-start lg:items-center w-full py-6 fixed bottom-0 overflow-x-auto">
			<div className="today bg-opacity-70 bg-black flex items-center justify-center border border-white rounded-lg pr-8 mr-8" style={{ minWidth: "360px", minHeight: '205px' }}>
				<img
					src={`http://openweathermap.org/img/wn/${
						dailyForecast.length > 0 &&
						dailyForecast[0].weather[0]?.icon
					}@4x.png`}
					alt="Weather Icon"
					className="weather-icon"
				/>
				<div className="today-info-container">
					<div className="day">
						{dailyForecast.length > 0 &&
							formatDay(new Date(dailyForecast[0].dt * 1000))}
					</div>
					<div className="temp text-lg">
						Day -{" "}
						{dailyForecast.length > 0 && dailyForecast[0].temp.day}
						°C
					</div>
					<div className="temp text-lg">
						Night -{" "}
						{dailyForecast.length > 0 &&
							dailyForecast[0].temp.night}
						°C
					</div>
				</div>
			</div>

			<div className="weather-forecast flex justify-center">
				{dailyForecast.slice(1).map((day, index) => (
					<div
						className="weather-forecast-item flex flex-col items-center justify-center border border-white rounded-lg p-4 mr-4 bg-opacity-70 bg-black"
						key={index}
						style={{ minWidth: "170px", height: '200px'  }}
					>
						<div className="day text-lg">
							{formatDay(new Date(day.dt * 1000))}
						</div>
						<img
							src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
							alt="Weather Icon"
							className="weather-icon"
						/>
						<div className="temp text-lg">
							Day - {day.temp.day}°C
						</div>
						<div className="temp text-lg">
							Night - {day.temp.night}°C
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const formatDay = (date) => {
	return date.toLocaleDateString("en-US", { weekday: "short" });
};

export default Forecast;
