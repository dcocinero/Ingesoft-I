package org.worm.bookhunt.chat;

import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage saveMessage(ChatMessage chatMessage) {
        chatMessage.setCreatedAt(LocalDateTime.now());
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> findMessagesByClubId(String clubId, Pageable pageable) {
        return chatMessageRepository.findClubId(clubId, pageable);
    }
}