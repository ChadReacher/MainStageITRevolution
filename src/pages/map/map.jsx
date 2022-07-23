import React, { useState } from 'react'
// Components
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import L from 'leaflet'
import { Modal } from '../../components'
// Styles
import './map.css'

const Map = () => {
  const [isModalInfoOpen, setModalInfoOpen] = useState(false);


  // Maps handlers
  const icon = L.icon({
    iconUrl: 'https://www.sciencenewsforstudents.org/wp-content/uploads/2020/04/1030_LL_trees-1028x579.png',
    iconSize: [60, 60],
    className: 'marker'
  })

  const onClick = () => {
    setModalInfoOpen(true)
  }

  const LocationFinder = () => {
    useMapEvent({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };

  // View

  return (
    <div className="container">

      <div className="container-map">

        <MapContainer
          zoom={12}
          center={[49.23768441174952, 28.469507670557647]}
          style={{ width: "100%", height: "80vh" }}
          scrollWheelZoom={false}
        >

          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          <Marker position={[49.23768441174952, 28.469507670557647]} icon={icon} eventHandlers={{
            click: onClick,
          }} />
          <LocationFinder />
        </MapContainer>
      </div>

      <Modal isOpen={isModalInfoOpen} handleClose={() => setModalInfoOpen(false)}>
        <div className="avatar-container">
          <img src="https://www.sciencenewsforstudents.org/wp-content/uploads/2020/04/1030_LL_trees-1028x579.png" alt="tree" className='avatar-tree'/>
        </div>
         <div className='row'>
          <p className="tree-title">Name</p>
          <p className="tree-title">Maple</p>
          </div>
         <div className='row'>
          <p className="tree-title">Age</p>
          <p className="tree-title">20</p>
          </div>
         <div className='row'>
          <p className="tree-title">Status</p>
          <p className="tree-title">Safe</p>
          </div>
         <div className='row'>
          <p className="tree-title">Need work</p>
          <p className="tree-title">No needs</p>
          </div>
      </Modal>
    </div>
  )
}
export default Map
