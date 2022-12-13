import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper , Typography , useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating'

import mapStyles from './mapStyles';
import useStyles from './styles';



const Map = ({setCoordinates , setBounds , coordinates ,places , setChildClicked }) => {
    
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
            bootstrapURLKeys={ {key: process.env.REACT_MAPS_GOOGLE_MAPS_API_KEY}}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={12}
            margin={[50 ,50 , 50 , 50]}
            options={{ disableDefaultUI: true , zoomControl: true , styles:mapStyles}}
            onChange={(e) => {
                setCoordinates({lat: e.center.lat , lng: e.center.lng});
                setBounds({ne: e.marginBounds.ne , sw: e.marginBounds.sw});
            }}
            onChildClick={(child) => {
                setChildClicked(child);
            }}
            >

            {places?.map( (place , i) => (
                    <div className={classes.markerContainer}
                        lat={Number(place.latitude)} 
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop? (
                            <LocationOnOutlinedIcon color='primary' fontSize='large'/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} varient="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
                                    alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }

                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
}

export default Map;