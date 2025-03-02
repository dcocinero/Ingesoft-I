package org.worm.bookhunt.chat;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatWebSocketTest {

    @LocalServerPort
    private int port;
    private WebSocketStompClient stompClient;
    private static final String WEBSOCKET_ENDPOINT = "/ws";
    private static final String SUBSCRIBE_TOPIC = "/topic/public";
    private static final String SEND_DESTINATION = "/app/chat.sendMessage";

    @BeforeEach
    public void setup() {
        stompClient = new WebSocketStompClient(new StandardWebSocketClient());
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
    }

    @Test
    public void testSendMessage() throws Exception {
        String url = "ws://localhost:" + port + WEBSOCKET_ENDPOINT;
        // Provide the bearer token via WebSocketHttpHeaders
        WebSocketHttpHeaders webSocketHttpHeaders = new WebSocketHttpHeaders();
        webSocketHttpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDg4NzI0OCwiZXhwIjoxNzQwOTIzMjQ4fQ.yik4xHERLV4a5PWp24F-mgPNe9MZTeIS9FjC3SKZ76FXsVTZomfIBbflb0HEJSg4");

        CompletableFuture<StompSession> sessionFuture = new CompletableFuture<>();
        stompClient.connect(url, webSocketHttpHeaders, new CompletableStompSessionHandler(sessionFuture));
        StompSession stompSession = sessionFuture.get(1, TimeUnit.SECONDS);

        final CompletableFuture<ChatMessage> completableFuture = new CompletableFuture<>();
        stompSession.subscribe(SUBSCRIBE_TOPIC, new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return ChatMessage.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                completableFuture.complete((ChatMessage) payload);
            }
        });

        SendMessageRequest sendMessageRequest = new SendMessageRequest();
        sendMessageRequest.setMessage("Hola WebSocket");
        sendMessageRequest.setClubId("67c0fc8b11d9dd000959316d");

        stompSession.send(SEND_DESTINATION, sendMessageRequest);

        ChatMessage receivedMessage = completableFuture.get(3, TimeUnit.SECONDS);
        Assertions.assertNotNull(receivedMessage);
        Assertions.assertEquals("Hola WebSocket", receivedMessage.getContent());
    }
}