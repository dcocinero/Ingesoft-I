package org.worm.bookhunt.club;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

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
    private Set<String> members = new HashSet<>();
}
