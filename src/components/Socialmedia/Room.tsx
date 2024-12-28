import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const Room = () => {

    const {roomId} = useParams()
    const myMeeting = async(element)=>{
      const appID = 779740772;
      const serverSecret ="becaeb2cba68ad4a9dce0831b32431e4"
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
