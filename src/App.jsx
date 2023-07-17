import React, { useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/Forecast";

const App = () => {
	const [currentTime, setCurrentTime] = useState("");
	const [currentDate, setCurrentDate] = useState("");
	const [timezone, setTimezone] = useState("");
	const [currentWeather, setCurrentWeather] = useState({});
	const [dailyForecast, setDailyForecast] = useState([]);

	useEffect(() => {
		getTimeAndDate();
		getWeatherData();
	}, []);

	const getTimeAndDate = () => {
		const timeInterval = setInterval(() => {
			const time = new Date();
			setCurrentTime(formatTime(time));
			setCurrentDate(formatDate(time));
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	};

	const formatTime = (time) => {
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		return `${formattedHours}:${formattedMinutes} ${ampm}`;
	};

	const formatDate = (date) => {
		const options = { weekday: "long", day: "numeric", month: "short" };
		return date.toLocaleDateString(undefined, options);
	};

	const getWeatherData = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const apiKey = "74087a43755a584e6bf15cc2a7edf687";

				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
					);
					const data = await response.json();
					showWeatherData(data);
				} catch (error) {
					console.log("Error fetching weather data:", error);
				}
			});
		}
	};

	const getCustomWeatherData = async (input) => {
		const apiKey = "74087a43755a584e6bf15cc2a7edf687";

		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`
			);
			const data = await response.json();
			const { lat, lon } = data.coord;

			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
			);
			const forecastData = await forecastResponse.json();

			showWeatherData(forecastData);
		} catch (error) {
			console.log("Error fetching custom weather data:", error);
		}
	};

	const showWeatherData = (data) => {
		const { timezone, current, daily } = data;
		setTimezone(timezone);
		setCurrentWeather(current);
		setDailyForecast(daily);
	};

	return (
		<div className="w-full h-screen bg-center bg-cover" style={{backgroundImage: `url(https://source.unsplash.com/1600x900/?Landscape)`}}>
			<div className="w-full flex justify-center lg:justify-start flex-wrap p-2 lg:p-6 text-white">
				<div className="date-container flex flex-col justify-center items-center">
					<div className="time text-3xl sm:text-6xl">{currentTime}</div>
					<div className="date text-2xl sm:text-3xl">{currentDate}</div>
					<div className="bg-opacity-60 bg-gray-800 p-2 lg:p-6 rounded-lg border border-white mt-2 lg:mt-6">
						<WeatherInfo
							feelsLike={currentWeather.feels_like}
							description={
								currentWeather.weather &&
								currentWeather.weather[0]?.main
							}
							humidity={currentWeather.humidity}
							pressure={currentWeather.pressure}
							windSpeed={currentWeather.wind_speed}
							sunrise={currentWeather.sunrise}
							sunset={currentWeather.sunset}
						/>
					</div>
				</div>
			</div>

			<section className="flex justify-center items-center">
				<div className="p-2 lg:p-8 bg-opacity-70 bg-black text-white rounded-full lg:-mt-28">
					<SearchBar onSearch={getCustomWeatherData} />
				</div>
			</section>

			<Forecast dailyForecast={dailyForecast} />
		</div>
	);
};

export default App;
