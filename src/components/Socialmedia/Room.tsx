import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const Room = () => {

    const {roomId} = useParams()
    const myMeeting = async(element)=>{
      const appID = 1196906385;
      const serverSecret ="ef569d2381f96435cb0f096230cd14b2"
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId as string,Date.now().toString(),"shikhil")
      const zc = ZegoUIKitPrebuilt.create(kitToken)
      zc.joinRoom({
        container:element,
        sharedLinks:[{
            name:'Copy Link',
            url:`http://localhost:8000/room/${roomId}`
        }],
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton:false
      })
    }
  return (
    <div>
    <div ref={myMeeting}/>
    </div>
  )
}

export default Room
