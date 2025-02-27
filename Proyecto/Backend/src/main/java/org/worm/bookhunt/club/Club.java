package org.worm.bookhunt.club;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Club {
    @Id
    private String id;
    private String name;
    private String description;
    private List<String> members;
}
