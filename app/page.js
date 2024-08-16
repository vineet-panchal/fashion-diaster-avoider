'use client'
import { useState } from "react";
import { Box, Stack, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import bg1 from './assets/bg-1.jpg';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi, I'm the Fashion Disaster Avoider Support Agent, how can I assist you today?`,
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async() => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ""},
    ])
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
    
  }

  return (
    <>
      {/* <Box
        position={"relative"}
        width="100%"
        height="100vh"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // sx={{
        //   backgroundImage:"url('assets/bg-1.jpg')",
        // }}
        // sx={{
        //   backgroundImage: `url("./assets/bg-1.jpg")`,
        //   backgroundPosition: `right bottom`,
        //   backgroundRepeat: `no-repeat`,
        //   backgroundSize: `300px 300px`,
        //   height: "100%",
        //   width: "100%",
        // }}
        flexDirection={"column"}
      >  */}
      <div className="main-ctr">
        
        {/* page-ctr */}


        <Stack
          direction={"column"}
          width="80%"
          // height="700px"
          border="1px solid black"
          borderRadius={3}
          p={8}
          m={4}
          spacing={3}
          // bgcolor={"#535756"}
          opacity={0.4}
          
          > 

            <Stack
              direction={"column"} 
              spacing={2}
              flexGrow={1}
              overflow="auto"
              maxHeight="70vh"
              
              >
              
              {messages.map((message, index) => (
                <Box 
                key={index} 
                display="flex" 
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
                >
                  <Box
                    bgcolor={
                      message.role === 'assistant' ? 'primary.main' : 'secondary.main'
                    }
                    position={"relative"}
                    color="white"
                    borderRadius={16}
                    p={3}
                    fontSize={12}
                    mr={5}
                    maxWidth={700}
                    >
                    {message.content}
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={2} >
              {/* <TextField id="standard-basic" label="Message" variant="standard" fullWidth value={message} onChange={(e) => setMessage(e.target.value)}  /> */}
              <TextField id="filled-basic" label="Message" variant="filled" fullWidth value={message} onChange={(e) => setMessage(e.target.value)}  />
              <Button color="secondary" size="large" variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>Send</Button>
            </Stack>
          </Stack>
        </div>

      {/* </Box> */}
    </>
  )
} 
