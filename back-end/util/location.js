const axios=require('axios')
const key="ed8602b2284fc55b61119d12eb85360e";

const findGeoCode= async(address)=>{
    const response=await axios.get(`http://api.positionstack.com/v1/forward?access_key=ed8602b2284fc55b61119d12eb85360e&query=${address}`);
    const data= await response.data;
    return [data.data[0].latitude,data.data[0].longitude];
}

module.exports=findGeoCode;