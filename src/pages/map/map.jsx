import React, { useState, useEffect } from 'react'
// Maps
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import L from 'leaflet'
// Components
import { Modal, Loader } from '../../components'
import { ModalInfo } from './components'
// Styles
import './map.css'
import { Button } from '@mui/material';
// Hooks
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
// Store
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  selectLoading,
  fetchAllTrees,
  getBaseImage,
  selectBaseImage,
  selectAllTrees
} from '../../store/map';


const schema = Yup.object({
  name: Yup.string().required(),
  age: Yup.string().required(),
  condition: Yup.string().required(),
  image: Yup.string().required(),
  needs: Yup.string(),
}).required();

const Map = () => {

  const [isModalInfoOpen, setModalInfoOpen] = useState(false);
  const [isAddTreeModalOpen, setAddTreeModalOpen] = useState(false);
  const [treeLocation, setTreeLocation] = useState(null);
  const [singleTree, setSingleTree] = useState(null);

  const isLoading = useSelector(selectLoading)
  const baseImage = useSelector(selectBaseImage)
  const trees = useSelector(selectAllTrees)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllTrees())
  }, [])

  // Form

  const { register, handleSubmit, formState: { isValid, isDirty } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setAddTreeModalOpen(false)
    console.log({ ...data, ...treeLocation, image: baseImage })
  }


  const handleFileChange = (e) => {
    dispatch(getBaseImage(e.target.files[0]));
  }

  // Maps handlers

  const onMarkClick = (id) => {
    setSingleTree(trees.find(item => item.registeredNumber === id))
    setModalInfoOpen(true)
  }

  const LocationFinder = () => {
    useMapEvent({
      click(e) {
        setAddTreeModalOpen(true)
        setTreeLocation(e.latlng);
      },
    });
    return null;
  };

  if (isLoading) {
    return <Loader />
  }

  // View

  return (
    <div className="container">

      <div className="container-map">

        <MapContainer
          zoom={13}
          center={[49.23768441174952, 28.469507670557647]}
          style={{ width: "100%", height: "80vh" }}
          scrollWheelZoom={false}
        >

          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {trees?.map(item => {
            return <Marker
              position={[item.latitude, item.longitude]}
              icon={L.icon({
                iconUrl: `data:image/jpeg;base64,${item.image.imageData}`,
                iconSize: [item.crownRadius * 3, item.crownRadius * 3],
                className: 'marker'
              })}
              eventHandlers={{
                click: () => onMarkClick(item.registeredNumber),
              }}
              key={item.registeredNumber}
            />
          })
          }

          <LocationFinder />
        </MapContainer>
      </div>

      <ModalInfo
        isOpen={isModalInfoOpen}
        handleClose={() => setModalInfoOpen(false)}
        image={`data:image/jpeg;base64,${singleTree?.image?.imageData}`}
        name={singleTree?.type}
        age={singleTree?.age}
        status={singleTree?.condition}
        neededWork={'singleTree'}
      />

      <Modal isOpen={isAddTreeModalOpen} handleClose={() => setAddTreeModalOpen(false)}>
        <form className='form_container' onSubmit={handleSubmit(onSubmit)}>
          <p className="tree-title">Name</p>
          <input type="text" placeholder='Input tree name' className='form_input' {...register("name")} />
          <p className="tree-title">Age</p>
          <input type="text" placeholder='Input tree age' className='form_input' {...register("age")} />
          <p className="tree-title">Status</p>
          <input type="text" placeholder='Input tree status' className='form_input' {...register("condition")} />
          <p className="tree-title">Needed work</p>
          <input type="text" placeholder='Input tree needs' className='form_input' {...register("needs")} />
          <div className="row">
            <label className="tree-title file" for="inputTag">Select Image
              <input type="file" id="inputTag" placeholder='Input tree need' className='form_input' {...register("image")} onChange={handleFileChange} />
            </label>
            {baseImage ? <img src={`data:image/jpeg;base64,${baseImage}`} alt="chosen_image" className='chosen_image' /> : null}
          </div>
          <Button variant="contained" color="success" type="submit" sx={{ marginTop: 2 }} disabled={!isDirty || !isValid}>Set tree</Button>
        </form>
      </Modal>
    </div>
  )
}
export default Map
