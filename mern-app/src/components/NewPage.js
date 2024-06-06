import React, { useCallback, useEffect, useState } from 'react';
import { useSocketContext } from '../helpers/Socket';
import ReactPlayer from 'react-player';
import peerServiceInstance from '../Service/Peer';

const NewPage = () => {
  const { socket } = useSocketContext();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [MyStream, setMyStream] = useState();
  const [RemoteStream,setRemoteStream]=useState();

  const handleUserJoined = useCallback(({ id, email }) => {
    console.log("id is", id);
    // Update remoteSocketId when a user joins
    setRemoteSocketId(id);
  }, []);

  const handleNegoIncoming=useCallback(async ({from,offer})=>{
const ans=await peerServiceInstance.getAnswer(offer);
socket.emit('peer:nego:done',{to:from,ans});
  },[socket])

  
  const handleNegoDone=useCallback(async({ans})=>{
await peerServiceInstance.setLocalDescription(ans);
  },[])
  
  
  const handleIncomingCall = useCallback(async({ from, offer }) => {
    console.log("Incoming call from", from);
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
    const answer=await peerServiceInstance.getAnswer(offer);
    socket.emit("call:accepted",{to:from,answer});
  }, [socket]);

  const sendStreams=useCallback(()=>{
    for(const track of MyStream.getTracks())
    {
      peerServiceInstance.peer.addTrack(track,MyStream);
    }
    
  },[MyStream])

  const handleCallAccepted=useCallback(async({from,answer})=>{
    peerServiceInstance.setLocalDescription(answer);
    console.log("call accepteeeeeeeeeddddddddd"); 
 
sendStreams();
  },[sendStreams])

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peerServiceInstance.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peerServiceInstance.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peerServiceInstance.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);
  useEffect(()=>{
    peerServiceInstance.peer.addEventListener('track',async ev=>{
      const remote=ev.streams;
      setRemoteStream(remote[0]);
    })

  },[])

  useEffect(() => {
    if (socket) {
      socket.on("userJoined", handleUserJoined);
      socket.on('incoming-call', handleIncomingCall);
      socket.on('call:accepted',handleCallAccepted);
      socket.on('peer:nego:needed',handleNegoIncoming);
      socket.on('peer:nego:final',handleNegoDone);
      return () => {
        socket.off("userJoined", handleUserJoined);
        socket.off("incoming-call", handleIncomingCall);
        socket.off('call:accepted',handleCallAccepted);
        socket.off('peer:nego:needed',handleNegoIncoming);
        socket.off('peer:nego:final',handleNegoDone);
      };
    }
  }, [socket, handleUserJoined, handleIncomingCall,handleCallAccepted,handleNegoIncoming,handleNegoDone]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const offer = await peerServiceInstance.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [socket, remoteSocketId]);




  return (
    <>
      <div style={{ color: "white" }}>
        
        <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      </div>  
      <h2 style={{color:'white',fontSize:'30px'}}>{MyStream&&<button onClick={sendStreams}>Send Stream</button>}</h2>
      <h1 style={{ paddingTop: '20px', color: "white", fontSize: "30px" }} onClick={handleCallUser}>
        {remoteSocketId && <button>Call</button>}
      </h1>
      {MyStream && (
      <>
      <h1 style={{color:'white',paddingTop:'5px',fontSize:'20px'}}>My stream</h1>
      <ReactPlayer playing muted height="200px" width="300px" url={MyStream} />
      </>)}
      {RemoteStream && (
        <>
        <h1 style={{color:'white',paddingTop:'5px',fontSize:'20px'}}>Remote Stream</h1>
      <ReactPlayer playing muted height="200px" width="300px" url={RemoteStream} />
      </>)}
    </>
  );
};

export default NewPage;
