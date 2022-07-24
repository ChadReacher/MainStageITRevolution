import React, { useState, useEffect } from 'react'
// Maps
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import L from 'leaflet'
// Components
import { Modal, Loader } from '../../components'
import { ModalInfo } from './components'
import { FormControl, FormHelperText, Select, MenuItem } from '@mui/material'
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
  selectBaseImage,
  selectAllTrees,
  selectIsTreeDeleted,
  fetchAllTrees,
  getBaseImage,
  fetchAddTree,
  fetchDeleteTree,
  selectIsTreeAdded,
} from '../../store/map';


const schema = Yup.object({
  type: Yup.string().required(),
  age: Yup.number().required(),
  crownRadius: Yup.number().required(),
  condition: Yup.string().required(),
  image: Yup.string().required(),
  workType: Yup.string().nullable(true).required(),
}).required();

const Map = () => {

  const [isModalInfoOpen, setModalInfoOpen] = useState(false);
  const [isAddTreeModalOpen, setAddTreeModalOpen] = useState(false);
  const [treeLocation, setTreeLocation] = useState(null);
  const [singleTree, setSingleTree] = useState(null);

  const isLoading = useSelector(selectLoading)
  const baseImage = useSelector(selectBaseImage)
  const trees = useSelector(selectAllTrees)
  const isTreeDeleted = useSelector(selectIsTreeDeleted)
  const isTreeAdded = useSelector(selectIsTreeAdded)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllTrees())
  }, [])

  useEffect(() => {
    dispatch(fetchAllTrees())
  }, [isTreeDeleted, isTreeAdded])

  // Form

  const { register, handleSubmit, formState: { isValid, isDirty, errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setAddTreeModalOpen(false)
    dispatch(fetchAddTree({
      ...data,
      ...treeLocation,
      image: { imageData: baseImage },
      workType: data.workType === 'None' ? null : data.workType
    }))
  }


  const handleFileChange = (e) => {
    dispatch(getBaseImage(e.target.files[0]));
  }

  const onDeleteTree = (id) =>  {
    setModalInfoOpen(false)
    dispatch(fetchDeleteTree(id));
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
        //e.latlng
        setTreeLocation({
          latitude: e.latlng?.lat,
          longitude: e.latlng?.lng
        });
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
            const isTreeTooBig = item.crownRadius > 20;
            const radius = isTreeTooBig ? item.crownRadius: item.crownRadius * 3
            return <Marker
              position={[item.latitude, item.longitude]}
              icon={L.icon({
                iconUrl: `data:image/jpeg;base64,${item.image.imageData}`,
                iconSize: [radius, radius],
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
        crownRadius={singleTree?.crownRadius}
        neededWork={singleTree?.workType}
        onDelete={() => onDeleteTree(singleTree?.registeredNumber)}
      />

      <Modal isOpen={isAddTreeModalOpen} handleClose={() => setAddTreeModalOpen(false)}>
        <form className='form_container' onSubmit={handleSubmit(onSubmit)}>
          <p className="tree-title">Type</p>
          <input type="text" placeholder='Input tree type' className='form_input' {...register("type")} />
          <p className="tree-title">Age</p>
          <input type="text" placeholder='Input tree age' className='form_input' {...register("age")} />
          {errors.age?.message ? <FormHelperText sx={{ color: 'red' }}>Age must be a number</FormHelperText>: null}
          <p className="tree-title">Crown radius in (M)</p>
          <input type="text" placeholder='Input tree crown radius' className='form_input' {...register("crownRadius")} />
         {errors.crownRadius?.message ? <FormHelperText sx={{ color: 'red' }}>Crown radius must be a number</FormHelperText>: null}
          <p className="tree-title">Condition</p>
          <input type="text" placeholder='Input tree status' className='form_input' {...register("condition")} />
          <p className="tree-title">Work type</p>
          <FormControl variant="standard" sx={{ minWidth: '200px', mb: 1 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Age"
              {...register("workType")}
            >
              <MenuItem value={'None'}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'treatment'}>treatment</MenuItem>
              <MenuItem value={'trimming'}>trimming</MenuItem>
              <MenuItem value={'removal'}>removal</MenuItem>
            </Select>
          </FormControl>
          <div className="row">
            <label className="tree-title file" for="inputTag">Select Image
              <input type="file" id="inputTag" placeholder='Input tree need' className='form_input' {...register("image")} onChange={handleFileChange} />
            </label>
            {baseImage ? <img src={`data:image/jpeg;base64,${baseImage}`} alt="chosen_image" className='chosen_image' /> : null}
          </div>
          <Button variant="contained" color="success" type="submit" disabled={!isDirty || !isValid}>Set tree</Button>
        </form>
      </Modal>
    </div>
  )
}
export default Map
