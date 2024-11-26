import { useRef, useEffect } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useStore } from "@nanostores/react"
import { themeStore } from "@/stores/themeStore"

const Map = () => {
  const API_KEY = import.meta.env.PUBLIC_MAP_KEY
  const theme = useStore(themeStore)
  const mapContainer = useRef(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const lng = 4.701625
  const lat = 50.879044
  const zoom = 13

  useEffect(() => {
    if (theme === "dark") {
      map.current?.setStyle(
        `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=${API_KEY}`
      )
    } else {
      map.current?.setStyle(
        `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`
      )
    }
  }, [theme])

  useEffect(() => {
    if (map.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current ?? "",
      style:
        theme === "dark"
          ? `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=${API_KEY}`
          : `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
      boxZoom: false,
    })

    if (markerRef.current) {
      new maplibregl.Marker({ element: markerRef.current })
        .setLngLat([lng, lat])
        .addTo(map.current)

      markerRef.current.classList.remove("hidden")
      markerRef.current.classList.add("flex")
    }
  }, [API_KEY, lng, lat, zoom])

  return (
    <div className="map-wrap sm:h-64 h-52 group relative rounded overflow-hidden sm:[mask-image:linear-gradient(to_top,transparent_15%,#000_20%)] [mask-image:linear-gradient(to_top,transparent_18%,#000_20%)]">
      <div ref={mapContainer} className="absolute size-full" />

      <span
        ref={markerRef}
        className="relative size-2.5 maplibregl-marker maplibregl-marker-anchor-center hidden"
        aria-label="Map marker"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
        <span className="relative inline-flex size-2.5 rounded-full bg-blue-500"></span>
      </span>
    </div>
  )
}

export default Map
