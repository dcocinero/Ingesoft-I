package org.worm.bookhunt.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.worm.bookhunt.user.User;
import org.worm.bookhunt.user.UserRepository;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final UserRepository userRepository;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload SendMessageRequest sendMessageRequest) {
        ChatMessage chatMessage = this.getChatMessage(sendMessageRequest);
        this.chatMessageService.saveMessage(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload SendMessageRequest sendMessageRequest,
                               SimpMessageHeaderAccessor headerAccessor) {
        ChatMessage chatMessage = this.getChatMessage(sendMessageRequest);
        String username = ((UserDetails) SecurityContextHolder.
                getContext().
                getAuthentication().
                getPrincipal()).
                getUsername();
        headerAccessor.getSessionAttributes().put("username", username);
        return chatMessage;
    }

    private ChatMessage getChatMessage(SendMessageRequest sendMessageRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new RuntimeException("User is not authenticated");
        }
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();


        // Retrieve the full user to extract the ID
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ChatMessage.builder()
                .content(sendMessageRequest.getMessage())
                .clubId(sendMessageRequest.getClubId())
                .authorId(user.getId())
                .build();
    }


}
