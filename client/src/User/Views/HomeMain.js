import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Card, CardActionArea, Typography, Divider } from '@material-ui/core'
import ReactPlaceholder from 'react-placeholder';
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { useStateValue } from '../LocationStateProvider';
const placeHolders = [{},{},{},{},{},{},{},{},{},] 
function HomeMain({ update }) {
    const history = useHistory();
    const [state] = useStateValue()
    const [allrestaurantList, setAllRestaurantList] = useState([])
    const [restaurantList, setRestaurantList] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [query,setQuery] = useState('')
    useEffect(() => {
        setQuery('')
        axios.get(`https://foodeopen.herokuapp.com/api/restaurant/restaurantList?latitude=${state.currentaddress.lat}&longitude=${state.currentaddress.long}`)
            .then(function (response) {
                setRestaurantList(response.data)
                setAllRestaurantList(response.data)
                setIsLoading(false)
            }).catch(function (error) {
                setIsLoading(false)
            })
    },[update])

    const tagFilter = (arr,query)=>{
        var i=0
        for (;i<arr.length;i++)
        {
            
            if(arr[i].label.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')))
                 return true

        }

        // arr.map((item)=>{
        //     if(item.label.trim().toLowerCase().replace(/\s+/g, '').includes(query.trim().toLowerCase().replace(/\s+/g, '')))
        //         return true
        // })
        return false
    }


    const handleSearch = (str) =>{
      
        
            var i = 0
            var newlist = []
            for(;i<allrestaurantList.length;i++)
               {   
               
                   if((allrestaurantList[i].restaurantname.toLowerCase().replace(/\s+/g, '').includes(str.toLowerCase().replace(/\s+/g, '')))||
                       tagFilter(allrestaurantList[i].tags,str)   )
                    newlist = [...newlist, allrestaurantList[i]]
               }
            setRestaurantList(newlist)
           
        
    }

    const isOpened = (t1,t2) =>{
        var hours = (new Date()).getHours().toString()
        if(hours.length === 1)
            hours = "0".concat(hours);
        var mins = (new Date()).getMinutes().toString()

       return ((`${hours}:${mins}` >= t1)&&(`${hours}:${mins}` <= t2))
        
       

    }
    return (
        <div>
            <SearchBar
            style={{borderRadius:"18px"}}
            value={query}
            onChange={(val) => {
                setQuery(val)
                handleSearch(val)
            }
            }
            onCancelSearch={() => {setQuery('')
                    setRestaurantList(allrestaurantList)
            }}
            // onRequestSearch={handleSearch}
            placeholder="Restaurant name or a cuisine .."
            />
            <div style={{marginTop:"16px"}}/>
            <Typography
                variant="h5"
                style={{ color: "rgb(226,55,68)" }}
            >
                &nbsp; Marketplace
        </Typography>
            <Typography
                variant="subtitle1"
                color="primary"
            >
                &nbsp;&nbsp; {isLoading? "Getting":restaurantList.length} restaurant{restaurantList.length===1?"":"s"} around you{isLoading? " ..":""}

        </Typography>
        <div style={{marginBottom:"8px"}}/>
            <Grid container spacing={3}>
                {isLoading?placeHolders.map((placeHolder,index) =>
                        <Grid item xs={12} md={4} sm={6} key={index} >
                            <ReactPlaceholder style={{borderRadius:"18px",width:"100%",height:"215px"}} type="rect" ready={false} showLoadingAnimation={true} color='rgba(63,81,181,0.3)'>
                            
                            </ReactPlaceholder>
                            </Grid>
                )
                            :

               
                    (restaurantList).map((item, index) =>
                        <Grid item xs={12} md={4} sm={6} key={index} >
                            <Card className="hoverCard" style={{ borderRadius: "18px" }}>
                                <CardActionArea onClick={() => history.push(`restaurant?id=${item._id}`) }>
                                  
                                    {/* {console.log(((`${(new Date()).getHours().toString()}:${(new Date()).getMinutes().toString()}` >= item.openingtime) &&
                                                (`${(new Date()).getHours().toString()}:${(new Date()).getMinutes().toString()}` <= item.closingtime)))} */}

                                
                                    
                                    {/* {console.log(item.openingtime)}
                                    {console.log(item.closingtime)}
                                    {console.log(`${(new Date()).getHours().toString()}:${(new Date()).getMinutes().toString()}`.length)} */}
                    
                                    <img style={{
                                        height: "150px", width: "100%", objectFit:"cover",filter:
                                            isOpened(item.openingtime,item.closingtime) ?
                                                "none" : "grayscale(100%)"
                                    }} src={item.image?item.image:"https://res.cloudinary.com/dez3yjolk/image/upload/v1606580112/fooditems/FoodAndDrinkDesign_1_yjvvep.svg"} alt="restaurant" />
                                    <Divider style={{background: item.image?"white":"black"}} />
                                    <div style={{ paddingBottom: "8px", paddingLeft: "8px", paddingRight: "8px" }}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <Typography variant="h6">
                                                    {item.restaurantname}
                                                </Typography>
                                            </Grid>
                                            {isOpened(item.openingtime,item.closingtime) ?<div/>:
                                                <Grid item xs={4} style={{ marginTop: "6px", color: "rgb(226,55,68)" }}>
                                                    <Typography variant="caption">
                                                        Opens at {item.openingtime}
                                                    </Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                        <div style={{ flexDirection: "row", display: "flex" }}>
                                            {
                                                item.tags.slice(0, Math.min(3, item.tags.length)).map((tag, index) =>

                                                    <div key={tag.key}>
                                                        {
                                                            (index+1 === Math.min(3, item.tags.length)) ? <Typography variant="caption">{tag.label}</Typography> :
                                                                <Typography variant="caption">{tag.label + ' |'}&nbsp;</Typography>
                                                        }


                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                    
                    
                }
            </Grid>

        </div>
    )
}

export default HomeMain
