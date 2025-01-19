import { WebSocketServer } from 'ws';
import { generateWorkOutPlan } from './controllers/userController.js';
import jwt from "jsonwebtoken"


const setupWebSocket  = (server) => {
    const wss = new WebSocketServer({ noServer: true });

    // WebSocket connection setup
wss.on('connection', (ws) => {
    console.log('New client connected');
 
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
   if(!data.token){
            ws.send(JSON.stringify({ success: false, message: "not authorized login  again" }));
            ws.close(); 
            return;
        } 
        try {
            const token_decode = jwt.verify(data.token, process.env.JWT_SECRET);
            ws.userId = token_decode.id; 
            
            
        } catch (error) {
            ws.send(JSON.stringify({ success: false, message: "Invalid token" }));
            ws.close(); 
        }
    
        generateWorkOutPlan(ws, data);
    });
 
    ws.on('close', () => {
        console.log('Client disconnected');
    });
 
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
 });
 

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
     });

     return wss
}

export default setupWebSocket