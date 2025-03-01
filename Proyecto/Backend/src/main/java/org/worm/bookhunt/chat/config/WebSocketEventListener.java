package org.worm.bookhunt.chat.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.worm.bookhunt.chat.ChatMessage;
import org.worm.bookhunt.chat.MessageType;


@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    public void handleWebSocketEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            log.info("User Disconnected : " + username);
            var chatMessage = ChatMessage.builder()
                    .content("User Disconnected")
                    .sender(username)
                    .messageType(MessageType.LEAVE)
                    .build();
            messagingTemplate.convertAndSend("/topic/chat", chatMessage);
        }
    }
}
