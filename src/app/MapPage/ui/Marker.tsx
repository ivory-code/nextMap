import {LatLngExpression} from 'leaflet'
import {Marker, Popup} from 'react-leaflet'

const MapMarker = ({position}: {position: LatLngExpression}) => {
  return (
    <Marker position={position}>
      <Popup>현재 위치</Popup>
    </Marker>
  )
}

export default MapMarker
