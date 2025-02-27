package org.worm.bookhunt.Message;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Message {
    @Id
    private String id;
    private String clubId;
    private String userId;
    private String content;
    private Date date;
}
