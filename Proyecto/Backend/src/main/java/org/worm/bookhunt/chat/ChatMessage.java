package org.worm.bookhunt.chat;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ChatMessage {

    @Id
    private String id;
    private String authorId;
    @Indexed(unique = true)
    private String clubId;
    private String content;
    private LocalDateTime createdAt;
    private MessageType messageType;
}
