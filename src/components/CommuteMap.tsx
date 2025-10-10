import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock, Car, Train, Bike, Footprints } from 'lucide-react';

// Coordonnées du cabinet (16 rue Saint Antoine, 75004 Paris)
const CABINET_LOCATION = {
  lat: 48.8534,
  lng: 2.3664,
  address: '16 rue Saint Antoine, 75004 Paris'
};

const TRAVEL_MODES = {
  DRIVING: { id: 'DRIVING', label: 'Voiture', icon: Car },
  TRANSIT: { id: 'TRANSIT', label: 'Transport', icon: Train },
  BICYCLING: { id: 'BICYCLING', label: 'Vélo', icon: Bike },
  WALKING: { id: 'WALKING', label: 'Marche', icon: Footprints }
};

interface CommuteInfo {
  distance: string;
  duration: string;
  mode: string;
}

const CommuteMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedMode, setSelectedMode] = useState<string>('TRANSIT');
  const [commuteInfo, setCommuteInfo] = useState<CommuteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialiser la carte
  useEffect(() => {
    if (!mapRef.current || map) return;

    const initMap = () => {
      const googleMap = new google.maps.Map(mapRef.current!, {
        center: CABINET_LOCATION,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Marqueur du cabinet
      new google.maps.Marker({
        position: CABINET_LOCATION,
        map: googleMap,
        title: 'Cabinet d\'hypnothérapie - Alain Zenatti',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#1e40af',
          strokeWeight: 2
        }
      });

      const dirService = new google.maps.DirectionsService();
      const dirRenderer = new google.maps.DirectionsRenderer({
        map: googleMap,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3b82f6',
          strokeWeight: 5,
          strokeOpacity: 0.8
        }
      });

      setMap(googleMap);
      setDirectionsService(dirService);
      setDirectionsRenderer(dirRenderer);
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [map]);

  // Initialiser l'autocomplete
  useEffect(() => {
    if (!inputRef.current || !window.google || autocomplete) return;

    const auto = new google.maps.places.Autocomplete(inputRef.current, {
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(48.8156, 2.2241), // Sud-Ouest de Paris
        new google.maps.LatLng(48.9022, 2.4699)  // Nord-Est de Paris
      ),
      componentRestrictions: { country: 'fr' },
      fields: ['formatted_address', 'geometry', 'name']
    });

    auto.addListener('place_changed', () => {
      const place = auto.getPlace();
      if (place.geometry && place.geometry.location) {
        calculateRoute(place.geometry.location);
      }
    });

    setAutocomplete(auto);
  }, [map]);

  const calculateRoute = async (origin: google.maps.LatLng) => {
    if (!directionsService || !directionsRenderer) return;

    setLoading(true);
    setError('');

    try {
      const result = await directionsService.route({
        origin: origin,
        destination: CABINET_LOCATION,
        travelMode: selectedMode as google.maps.TravelMode,
        unitSystem: google.maps.UnitSystem.METRIC
      });

      directionsRenderer.setDirections(result);

      const route = result.routes[0];
      if (route && route.legs[0]) {
        setCommuteInfo({
          distance: route.legs[0].distance?.text || '',
          duration: route.legs[0].duration?.text || '',
          mode: selectedMode
        });
      }
    } catch (err) {
      setError('Impossible de calculer l\'itinéraire. Veuillez vérifier l\'adresse.');
      console.error('Directions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = async (mode: string) => {
    const previousMode = selectedMode;
    setSelectedMode(mode);

    // Recalculer immédiatement si une destination existe
    const place = autocomplete?.getPlace();
    if (place?.geometry?.location && previousMode !== mode) {
      await calculateRoute(place.geometry.location);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-nova-blue-dark mb-3 flex items-center">
          <Navigation className="mr-2" size={24} />
          Calculez votre temps de trajet
        </h3>
        <p className="text-gray-600 text-sm">
          Entrez votre adresse pour connaître le temps nécessaire pour rejoindre le cabinet
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Entrez votre adresse de départ..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-nova-blue focus:outline-none transition-colors"
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Modes de transport */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Mode de transport :</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(TRAVEL_MODES).map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedMode === mode.id
                    ? 'border-nova-blue bg-blue-50 text-nova-blue'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
                disabled={loading}
              >
                <Icon size={20} className="sm:w-6 sm:h-6" />
                <span className="text-xs mt-1 font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Informations de trajet */}
      {commuteInfo && (
        <div className="mb-4 p-4 bg-blue-50 border-2 border-nova-blue rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center">
              <Clock className="text-nova-blue mr-2 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-nova-blue-dark text-sm sm:text-base">Temps de trajet</p>
                <p className="text-xl sm:text-2xl font-bold text-nova-blue">{commuteInfo.duration}</p>
              </div>
            </div>
            <div className="sm:text-right ml-8 sm:ml-0">
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-lg font-semibold text-gray-800">{commuteInfo.distance}</p>
            </div>
          </div>
        </div>
      )}

      {/* Carte */}
      <div className="relative rounded-lg overflow-hidden shadow-lg h-64 sm:h-80 md:h-96">
        <div ref={mapRef} className="w-full h-full" />
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-nova-blue mx-auto mb-2"></div>
              <p className="text-sm sm:text-base text-gray-600">Calcul de l'itinéraire...</p>
            </div>
          </div>
        )}
      </div>

      {/* Adresse du cabinet */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <MapPin className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Adresse du cabinet</p>
            <p className="text-gray-600">{CABINET_LOCATION.address}</p>
            <p className="text-sm text-gray-500 mt-1">Métro : Bastille (Lignes 1, 5, 8)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuteMap;
