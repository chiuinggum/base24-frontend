import { useRef, useState, useEffect } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import axios from "axios";

export default function createMapPage () {
    const nameRef = useRef();
    const [address, setAddress] = useState("");

    function handleCreateButtonClick() {
        setAddress(nameRef.current.value);
        console.log(address);
    };

    return (
        <div className="flex bg-gray-200 min-h-screen  items-center justify-center">
            <form className="flex flex-col items-center">
                <span className="flex flex-row w-fit mb-4 gap-1 items-center">
                    <label className="text-gray-700 text-md font-bold" htmlFor="mapName">
                        Map Name:
                    </label>
                    <input
                        ref={nameRef}
                        className="rounded-lg appearance-none border border-gray-300 bg-gray-50 w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mapName"
                        placeholder="Paris Map"
                    />
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                        <Geocoding address={address}/>
                    </APIProvider>
                </span>
                <span className="flex flex-row gap-2">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={handleCreateButtonClick}
                    >
                        Create
                    </button>
                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>
                </span>
            </form>
        </div>
    );
};

function Geocoding({ address }) {
    const geocodingApiLoaded = useMapsLibrary('geocoding');
    const [geocodingService, setGeocodingService] = useState();
    const [geocodingResult, setGeocodingResult] = useState();

    useEffect(() => {
        if (!geocodingApiLoaded) return;
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geocodingApiLoaded]);

    useEffect(() => {
        if (!geocodingService || !address) return;
        geocodingService.geocode({ address }, (results, status) => {
            if (results && status === 'OK') {
                setGeocodingResult(results[0]);
            } else { console.log(status) }
        })
    }, [geocodingService, address])

    useEffect(() => {
        if (geocodingResult) {
            console.log(geocodingResult.formatted_address);
            console.log(
                geocodingResult.geometry.location.lat(),
                geocodingResult.geometry.location.lng()
            );
        }
        // await createMap();
    }, [geocodingResult]);

    if (!geocodingService) return <div>Loading...</div>
    if (!geocodingResult) return <div>Geocoding...</div>

    return (
        <div >
            <h1>{geocodingResult.formatted_address}</h1>
            <h2>{geocodingResult.geometry.location.lat()}</h2>
            <h2>{geocodingResult.geometry.location.lng()}</h2>
        </div>
    );
}

// send lat and lng to backend
async function createMap() {
    try {
        const response = axios.post()
    } catch (err) {
        console.error(err);
    }
}