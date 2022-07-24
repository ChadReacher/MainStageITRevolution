import React, { useEffect } from 'react'
// Components
import Loader from './../../components/loader/loader';
// Hooks
import { useSelector, useDispatch } from 'react-redux';
// Selectors
import {
    selectLoading,
    fetchHealthyTrees,
    fetchNeededWorkTrees,
    fetchRemovalTrees,
    selectRemovalTrees,
    selectHealthyTrees,
    selectNeededWorkTrees,
} from '../../store/map';
// Styles
import './tree-report.css'

const TreeReport = () => {
    const dispatch = useDispatch()

    const isLoading = useSelector(selectLoading)

    const removalTrees = useSelector(selectRemovalTrees)
    const healthyTrees = useSelector(selectHealthyTrees)
    const neededWorkTrees = useSelector(selectNeededWorkTrees)


    useEffect(() => {
        dispatch(fetchRemovalTrees())
        dispatch(fetchNeededWorkTrees())
        dispatch(fetchHealthyTrees())
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div class="right-bar">
            {/* Healthy */}
            <div class="header">
                <h1 className='tree_section-list-title' id='healthy'>Healthy trees</h1>
            </div>
            <div class="list">
                {healthyTrees.map(item => {
                    return (
                        <div class="list__item" key={item.registeredNumber}>
                            <div class="photo">
                                <img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="tree_photo" class="photo__tree" />
                            </div>
                            <div class="info">
                                <div class="info__item">Crown radius:<span>{item.crownRadius}</span></div>
                                <div class="info__item">Type:<span>{item.type}</span></div>
                                <div class="info__item">Age:<span>{item.age}</span></div>
                                <div class="info__item">Condition:<span>{item.condition}</span></div>
                                <div class="info__item">Work type:<span>{item.workType}</span></div>
                                <div class="info__item">Latitude:<span>{item.latitude}</span></div>
                                <div class="info__item">Longitude:<span>{item.longitude}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Removal */}
            <div class="header">
                <h1 className='tree_section-list-title' id="removal">Need removal trees</h1>
            </div>
            <div class="list">
                {removalTrees.map(item => {
                    return (
                        <div class="list__item" key={item.registeredNumber}>
                            <div class="photo">
                                <img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="tree_photo" class="photo__tree" />
                            </div>
                            <div class="info">
                                <div class="info__item">Crown radius:<span>{item.crownRadius}</span></div>
                                <div class="info__item">Type:<span>{item.type}</span></div>
                                <div class="info__item">Age:<span>{item.age}</span></div>
                                <div class="info__item">Condition:<span>{item.condition}</span></div>
                                <div class="info__item">Work type:<span>{item.workType}</span></div>
                                <div class="info__item">Latitude:<span>{item.latitude}</span></div>
                                <div class="info__item">Longitude:<span>{item.longitude}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Treatment */}
            <div class="header">
                <h1 className='tree_section-list-title' id="treatment">Need some treatment</h1>
            </div>
            <div class="list">
                {neededWorkTrees.map(item => {
                    return (
                        <div class="list__item" key={item.registeredNumber}>
                            <div class="photo">
                                <img src={`data:image/jpeg;base64,${item.image.imageData}`} alt="tree_photo" class="photo__tree" />
                            </div>
                            <div class="info">
                                <div class="info__item">Crown radius:<span>{item.crownRadius}</span></div>
                                <div class="info__item">Type:<span>{item.type}</span></div>
                                <div class="info__item">Age:<span>{item.age}</span></div>
                                <div class="info__item">Condition:<span>{item.condition}</span></div>
                                <div class="info__item">Work type:<span>{item.workType}</span></div>
                                <div class="info__item">Latitude:<span>{item.latitude}</span></div>
                                <div class="info__item">Longitude:<span>{item.longitude}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TreeReport