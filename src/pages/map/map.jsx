import React, { useState } from 'react'
// Maps
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import L from 'leaflet'
// Components
import { Modal } from '../../components'
import { ModalInfo } from './components'
// Styles
import './map.css'
import { Button } from '@mui/material';
// Hooks
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";


const Map = () => {
  const schema = Yup.object({
    name: Yup.string().required(),
    age: Yup.string().required(),
    status: Yup.string().required(),
    file: Yup.string().required(),
    needs: Yup.string(),
  }).required();
  
  const [isModalInfoOpen, setModalInfoOpen] = useState(false);
  const [isAddTreeModalOpen, setAddTreeModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data.file)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(img)
  }

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
        setAddTreeModalOpen(true)
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

      <ModalInfo
        isOpen={isModalInfoOpen}
        handleClose={() => setModalInfoOpen(false)}
        image={`data:image/jpeg;base64,${''}`}
        name={'Maple'}
        age={20}
        status={'Safe'}
        neededWork={'No needs'}
      />

      <Modal isOpen={isAddTreeModalOpen} handleClose={() => setAddTreeModalOpen(false)}>
        <form className='form_container' onSubmit={handleSubmit(onSubmit)}>
          <p className="tree-title">Name</p>
          <input type="text" placeholder='Input tree name' className='form_input' {...register("name")} />
          <p className="tree-title">Age</p>
          <input type="text" placeholder='Input tree age' className='form_input' {...register("age")} />
          <p className="tree-title">Status</p>
          <input type="text" placeholder='Input tree status' className='form_input' {...register("status")} />
          <p className="tree-title">Needed work</p>
          <input type="text" placeholder='Input tree needs' className='form_input' {...register("needs")} />
          <label className="tree-title file" for="inputTag">Select Image
            <input type="file" id="inputTag" placeholder='Input tree need' className='form_input' {...register("file")} onChange={handleFileChange}/>
          </label>
          <Button variant="contained" color="success" type="submit" sx={{ marginTop: 2 }}  disabled={!isDirty || !isValid}>Set tree</Button>
        </form>
      </Modal>
    </div>
  )
}
export default Map
